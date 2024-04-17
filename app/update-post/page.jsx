"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPost = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const postId = searchParams.get("id");

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({
		title: "",
		description: "",
	});

	useEffect(() => {
		const getPostDetails = async () => {
			const response = await fetch(`/api/post/${postId}`);

			const data = await response.json();

			setPost({ title: data.title, description: data.description });
		};

		if (postId) {
			getPostDetails();
		}
	}, [postId]);

	const editPost = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		if (!postId) {
			return alert("no ID");
		}

		try {
			const response = await fetch(`/api/post/${postId}`, {
				method: "PATCH",
				body: JSON.stringify({
					title: post.title,
					description: post.description,
				}),
			});

			if (response.ok) {
				router.push("/profile");
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type="Update "
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={editPost}
		/>
	);
};

export default EditPost;
