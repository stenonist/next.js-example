"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";
import { useUploadThing } from "@utils/uploadthing";


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

	
	const { startUpload } = useUploadThing('imageUploader')

	const createPost = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		let uploadedImageUrl = "";

		
		
		
		try {
			console.log(photo);
			if (photo.length > 0) {
				const uploadedImages = await startUpload(photo)
	
				if(!uploadedImages) {
					return
				}
	
				uploadedImageUrl = uploadedImages[0].url
			}
			setPhoto(uploadedImageUrl);
			post.photo = uploadedImageUrl;
			
			
			// let formdata = new FormData();
			// const fileInput = document.getElementById("fileInput");
			// formdata.append("files", fileInput.files[0]);
			// let requestOptions = {method: 'POST', body: formdata };
			// const uploadResponse = await fetch("/api/upload", requestOptions);
			// const result = await uploadResponse.json();
			// if (result.status === "success") {
			// 
			// }

			const data = {
				title: post.title,
				description: post.description,
				photo: post.photo,
				userId: session?.user.id,
			}
			console.log(data);
			
			const response = await fetch("/api/post/new", {
				method: "POST",
				body: JSON.stringify(data),
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
			photo={photo}
			setPhoto={setPhoto}
			submitting={submitting}
			handleSubmit={createPost}
		/>
	);
};

export default CreatePost;
