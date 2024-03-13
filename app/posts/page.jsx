"use client"

import { useState } from "react";

import Feed from "@components/Feed";

const Posts = () => {
    const [posts, setposts] = useState([])


	return (
		<div>
			<Feed />
		</div>
	);
};

export default Posts;
