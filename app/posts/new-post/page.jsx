"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePost = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		title: "",
		description: "",
	});

	const createPost = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/post/new", {
				method: "POST",
				body: JSON.stringify({
					title: post.title,
					description: post.description,
					userId: session?.user.id,
				}),
			});

			if (response.ok) {
				router.push("/posts");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type="Create"
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createPost}
		/>
	);
};

export default CreatePost;
