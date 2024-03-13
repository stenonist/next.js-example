import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req, res) => {
	const { userId, title, description } = await req.json();

	try {
		await connectToDB();

		const newPost = new Post({
			creator: userId,
			title,
			description,
		});

		await newPost.save();

		return new Response(JSON.stringify(newPost), {
			status: 201,
		});
	} catch (error) {
        console.log(error);
		return new Response("failed to create", { status: 500 });
	}
};
