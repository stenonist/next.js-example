"use client"

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Feed from "@components/Feed";

const Posts = () => {
	const router = useRouter();
	const { data: session } = useSession();

	return (
		<div>
			{session?.user ? (
				<Feed />
			):(
				<span>You are not logged in.</span>
			)}
		</div>
	);
};

export default Posts;
