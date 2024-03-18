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
		photo: ""
	});

	const [photo, setPhoto] = useState(null);

	const createPost = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);


		try {
			let formdata = new FormData();
			const fileInput = document.getElementById("fileInput");
			formdata.append("files", fileInput.files[0]);

			let requestOptions = {method: 'POST', body: formdata };

			const uploadResponse = await fetch("/api/upload", requestOptions);
			const result = await uploadResponse.json();
			if (result.status === "success") {
				const data = {
					title: post.title,
					description: post.description,
					photo: result.publicPath,
					userId: session?.user.id,
				}
				const response = await fetch("/api/post/new", {
					method: "POST",
					body: JSON.stringify(data),
				});
	
				if (response.ok) {
					router.push("/posts");
				}
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
			photo={photo}
			setPhoto={setPhoto}
			submitting={submitting}
			handleSubmit={createPost}
		/>
	);
};

export default CreatePost;
