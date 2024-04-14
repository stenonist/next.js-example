"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/ProfileComp";



const UserProfile = ({params}) => {
    const userId = params.id;

	const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null)

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${userId}/posts`
			);
			const data = await response.json();

			setPosts(data);
            setUser(data[0].creator)
		};

        fetchPosts();
	}, []);

	return (
        <>  
            <Profile
                name={user?.username}
                description="your profile"
                data={posts}
            />
        </>
		
	);
};

export default UserProfile;
