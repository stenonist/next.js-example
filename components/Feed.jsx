"use client";

import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";

const PostCardList = ({ data }) => {
	return (
		<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
			{data.map((post) => (
				<ItemCard 
                    key={post._id}
                    post={post} 
                />
			))}
		</div>
	);
};

const Feed = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch("/api/post");
			const data = await response.json();

			setPosts(data);
		};

		fetchPosts();
	}, []);

	return (
		<div className="mainCont">
			All Posts
			<PostCardList data={posts} />
		</div>
	);
};

export default Feed;
