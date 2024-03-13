"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
	const { data: session } = useSession();

	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);


	return (
		<nav className="flex flex-row py-2 px-4 bg-gray-50 justify-between w-full">
			<Link href="/" className="flex gap-2 items-center">
				<Image
					src={require('@public/assets/logo.svg')}
					alt="logo"
					width={160}
					height={42}
					className="object-contain"
				/>
			</Link>
			

			{/* Desktop */}
			<div className="sm:flex hidden">
				{session?.user ? (
					<div className="flex items-center gap-3 md:gap-5">
						<Link href="/posts" className="btn">
							Feed
						</Link>
						<Link href="/posts/new-post" className="btn">
							Create New Post
						</Link>
						<button
							type="button"
							onClick={signOut}
							className="btn-ghost"
						>
							Sign Out
						</button>
						<Link href="/profile" className="">
							<Image
								src={session?.user.image}
								alt=""
								width="42"
								height="42"
								className="rounded-full"
							/>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="btn-black"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile */}
			<div className="sm:hidden relative flex">
				{session?.user ? (
					<div className="flex">
						<Image
							src={session?.user.image}
							alt=""
							width="37"
							height="37"
							className="rounded-full"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href="/profile"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link
									href="/new-post"
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									New Post
								</Link>
								<button
									type="button"
									className="mt-4 btn"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className="btn-black"
								>
									Sign in
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
