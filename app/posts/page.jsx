"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Feed from "@components/Feed";

const Posts = () => {
	const router = useRouter();
	const { data: session } = useSession();

	if (!session?.user) {
		router.push("/");
	}

	return (
		<div>
			<Feed />
		</div>
	);
};

export default Posts;
