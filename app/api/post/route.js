import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, res) => {

	try {
		await connectToDB();

        const posts = await Post.find({}).populate('creator');
		
		return new Response(JSON.stringify(posts), {
			status: 200,
		});
	} catch (error) {
		return new Response("failed to fetch posts", { status: 500 });
	}
};
