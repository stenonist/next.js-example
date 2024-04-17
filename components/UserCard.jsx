"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

const UserCard = ({ user, current }) => {
	const [following, setFollowing] = useState(false);
	const { data: session } = useSession();
	const [followersNum, setFollowersNum] = useState(user.followers.length);
	const [followingNum, setFollowingNum] = useState(user.following.length);
	setTimeout(() => {
		const checkFollowing = async () => {
			const response = await fetch(`/api/follow/`, {
				method: "POST",
				body: JSON.stringify({
					userId: session?.user.id,
					followId: user._id,
				}),
			});
			const result = await response.json();

			if (result.following === true) {
				setFollowing(true);
			} else {
				setFollowing(false);
			}
		};
		checkFollowing();
	}, 100);

	const handleFollow = async () => {
		console.log("Click");
		try {
			const response = await fetch(`/api/follow/`, {
				method: "PATCH",
				body: JSON.stringify({
					userId: session?.user.id,
					followId: user._id,
				}),
			});

			if (response.ok) {
				setFollowersNum((prev) => prev + 1);
				setFollowing(true);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnfollow = async () => {
		try {
			const response = await fetch(`/api/unfollow/`, {
				method: "PATCH",
				body: JSON.stringify({
					userId: session?.user.id,
					followId: user._id,
				}),
			});

			if (response.ok) {
				setFollowersNum((prev) => prev - 1);
				setFollowing(false);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Image
				className="mx-auto rounded-full"
				src={user.image}
				alt={user.username}
				height={200}
				width={200}
			/>
			<p className="text-2xl font-medium text-center">{user.username}</p>
			<p className="mb-5 text-sm text-center">{user.email}</p>
			<div className="grid grid-cols-2 p-4 mb-5 border border-black divide-x-2 rounded-md">
				<div className="flex flex-col items-center gap-2">
					<p>Following</p>
					<span>{followingNum}</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<p>Followers</p>
					<span>{followersNum}</span>
				</div>
			</div>
			<div className="flex flex-col items-center mx-auto">
				{!following && (
					<button onClick={handleFollow} type="button">
						Follow
					</button>
				)}
				{following && (
					<button onClick={handleUnfollow} type="button">
						Unfollow
					</button>
				)}
			</div>
		</div>
	);
};

export default UserCard;
