"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ItemCard = ({ post, handleEdit, handleDelete }) => {
	const pathName = usePathname();
	const { data: session } = useSession();
	const router = useRouter();

	const [following, setFollowing] = useState(false);

	useEffect(() => {
		if (session?.user.following.includes(post.creator._id)) {
			setFollowing(true);
		}
	  
	}, [])
	


	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id)
			return router.push("/profile");

		router.push(
			`/profile/${post.creator._id}`
		);
	};
	const handleFollow= async ()=>{
		try {
			const response = await fetch(`/api/follow/`, {
				method: "PATCH",
				body: JSON.stringify({
					userId: session?.user.id,
					followId: post.creator._id
				}),
			});

			if (response.ok) {
				setFollowing(true);
				console.log("following");
				// router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {

		}
	}
	const handleUnfollow= async ()=>{
		try {
			const response = await fetch(`/api/unfollow/`, {
				method: "PATCH",
				body: JSON.stringify({
					userId: session?.user.id,
					followId: post.creator._id
				}),
			});

			if (response.ok) {
				setFollowing(false);
				console.log("unfollowed");
				// router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {

		}
	}

	return (
		<div className="rounded-md shadow-lg">
			<Image
				src=""
				alt=""
				width={200}
				height={200}
				className="w-full h-auto aspect-square"
			/>
			<div className="flex flex-col p-5 prose">
				<h2 className="block mb-3">{post.title}</h2>
				<p className="block mb-8">{post.description}</p>

				<div
					onClick={handleProfileClick}
					className="flex flex-row items-center gap-5 hover:cursor-pointer"
				>
					<Image
						src={post.creator.image}
						alt="auth_image"
						width={40}
						height={40}
						className="my-0 rounded-full"
					/>
					<span className="blcok">{post.creator.username}</span>
				</div>
				<div>
					{!following && (
						<button onClick={handleFollow} type="button">Follow</button>
						)
					}
					{following && (
						<button onClick={handleUnfollow} type="button">Unfollow</button>
					)

					}
				</div>
			</div>

			{session?.user.id === post.creator._id &&
				pathName === "/profile" && (
					<div className="flex flex-row justify-end gap-4 px-5 pt-3 mb-5 border-t border-gray-100">
						<p
							className="text-sm text-yellow-600 cursor-pointer"
							onClick={handleEdit}
						>
							Edit
						</p>
						<p
							className="text-sm text-red-700 cursor-pointer"
							onClick={handleDelete}
						>
							Delete
						</p>
					</div>
				)}
		</div>
	);
};

export default ItemCard;
