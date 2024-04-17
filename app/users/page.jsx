"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserCard from "@components/UserCard";

const Users = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [users, setUsers] = useState([]);
	const [current, setCurrent] = useState();
	useEffect(() => {
		const fetchUsers = async () => {
			if (session?.user) {
				const response = await fetch("/api/users", {
					next: { revalidate: 10 },
				});
				let data = await response.json();
				const newUsers = data.filter((u) => u._id != session?.user._id);
				setUsers(newUsers);
			}
		};
		fetchUsers();
	}, [session]);
	useEffect(() => {}, [session?.user]);

	return (
		<div className="grid grid-cols-6 gap-5 mainCont">
			{users &&
				users.map((user) => {
					return <UserCard key={user.email} user={user} />;
				})}
		</div>
	);
};

export default Users;
