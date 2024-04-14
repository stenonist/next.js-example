"use client";

import { useState, useEffect } from "react";
import ItemCard from "./ItemCard";

const PostCardList = ({ data }) => {
	return (
		<div className="grid grid-cols-1 gap-5 mt-16 sm:grid-cols-2 lg:grid-cols-4">
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
			const response = await fetch("/api/post", {next:{revalidate:10}});
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
