"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const ItemCard = ({ post, handleEdit, handleDelete }) => {
	const pathName = usePathname();
	const { data: session } = useSession();
	const router = useRouter();

	const handleProfileClick = () => {
		if (post.creator._id === session?.user.id)
			return router.push("/profile");

		router.push(
			`/profile/${post.creator._id}?name=${post.creator.username}`
		);
	};

	return (
		<div className="rounded-md shadow-lg">
			<Image
				src=""
				alt=""
				width={200}
				height={200}
				className="w-full h-auto aspect-square"
			/>
			<div className="p-5 flex flex-col prose">
				<h2 className="block mb-3">{post.title}</h2>
				<p className="block mb-8">{post.description}</p>

				<div
					onClick={handleProfileClick}
					className="flex items-center flex-row gap-5"
				>
					<Image
						src={post.creator.image}
						alt="auth_image"
						width={40}
						height={40}
						className="rounded-full my-0"
					/>
					<span className="blcok">{post.creator.username}</span>
				</div>
			</div>

			{session?.user.id === post.creator._id &&
				pathName === "/profile" && (
					<div className="mb-5 px-5 flex flex-row justify-end gap-4 border-t border-gray-100 pt-3">
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
