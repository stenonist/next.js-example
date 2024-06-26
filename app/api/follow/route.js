import User from "@models/user";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	const { userId, followId } = await request.json();

	try {
		await connectToDB();

		const followNew = await User.findOne({ _id: userId });

		let following = followNew.following;
		if (following.includes(followId)) {
			return NextResponse.json({ status: 200, following: true });
		} else {
			return NextResponse.json({ status: 200, following: false });
		}
	} catch (error) {
		return NextResponse.json({ status: 500 });
	}
};

export const PATCH = async (request) => {
	const { userId, followId } = await request.json();

	try {
		await connectToDB();
		console.log("userId", userId);
		console.log("followId", followId);

		// Find the existing user by ID
		const followNew = await User.findOne({ _id: userId });
		const followerNew = await User.findOne({ _id: followId });

		if (!followNew) {
			return new Response("Current User not found", { status: 404 });
		}
		if (!followerNew) {
			return new Response("User to follow not found", { status: 404 });
		}

		let following = followNew.following;
		let followers = followerNew.followers;

		if (!following.includes(followId)) {
			followNew.following = [...following, followId];
		}
		if (!followers.includes(userId)) {
			followerNew.followers = [...followers, userId];
		}

		await followNew.save();
		await followerNew.save();

		return new Response("Successfully updated the Users", { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response("Error Updating User", { status: 500 });
	}
};
