import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request,) => {
    const { userId, followId } = await request.json();
    
    try {
        await connectToDB()

        const followerNew = await User.findOne({'_id':followId})

        let followers = followerNew.followers;
        if (followers.includes(userId)) {
            return new Response("Following", { status: 200 });
        }else{
            return new Response("Not Following", { status: 400 });
        }
    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request) => {
    const { userId, followId } = await request.json();

    try {
        await connectToDB();

        // Find the existing user by ID
        const followNew = await User.findOne({'_id':userId})
        const followerNew = await User.findOne({'_id':followId})

        if (!followNew) {
            return new Response("Current User not found", { status: 404 });
        }
        if (!followerNew) {
            return new Response("User to follow not found", { status: 404 });
        }

        let following = followNew.following;
        let followers = followerNew.followers;

        if (following.includes(followId)) {
            followNew.following = following.filter((id)=>{
                id !== followId;
            })
        }
        if (followers.includes(userId)) {
            followerNew.followers = followers.filter((id)=>{
                id !== userId;
            })
        }
        
        await followNew.save();
        await followerNew.save();

        return new Response("Successfully updated the Users", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};