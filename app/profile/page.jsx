"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileComp from "@components/ProfileComp";

const Profile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${session?.user.id}/posts`
			);
			const data = await response.json();

			setPosts(data);
		};

		if (session?.user.id) {
			fetchPosts();
		}
	}, []);

	const handleEdit = (post) => {
		router.push(`/update-post?id=${post._id}`)
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this post?"
		  );
	  
		  if (hasConfirmed) {
			try {
			  await fetch(`/api/post/${post._id}`, {
				method: "DELETE",
			  });
	  
			  const filteredPosts = posts.filter((item) => item._id !== post._id);
	  
			  setPosts(filteredPosts);
			} catch (error) {
			  console.log(error);
			}
		  }
	};

	return (
		<ProfileComp
			name="My"
			description="your profile"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default Profile;
