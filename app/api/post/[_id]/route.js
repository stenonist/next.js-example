import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const post = await Post.findById(params._id).populate("creator")
        if (!post) return new Response("Post Not Found", { status: 404 });

        return new Response(JSON.stringify(post), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, description } = await request.json();

    try {
        await connectToDB();

        // Find the existing post by ID
        const existingPost = await Post.findById(params._id);

        if (!existingPost) {
            return new Response("Post not found", { status: 404 });
        }

        // Update the post with new data
        existingPost.title = title;
        existingPost.description = description;

        await existingPost.save();

        return new Response("Successfully updated the Posts", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error Updating Post", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the post by ID and remove it
        await Post.findByIdAndDelete(params._id);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error deleting post", { status: 500 });
    }
};