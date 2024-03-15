import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const user = await User.findById(params.id).populate("creator")
        if (!user) return new Response("User Not Found", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}


// Figure out the following process

/* export const PATCH = async (request, { params }) => {
    const { followe } = await request.json();

    try {
        await connectToDB();

        // Find the existing user by ID
        const existingUser = await User.findById(params.id);
        const existingUser = await User.findOne({ $and 'followers': "65f3ff4511f415ae866db81b"})

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        // Update the user with new data
        existingUser.user = user;

        await existingUser.save();

        return new Response("Successfully updated the Users", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
}; */

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the user by ID and remove it
        await User.findByIdAndRemove(params.id);

        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user", { status: 500 });
    }
};