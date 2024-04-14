"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const SignupButton = ({ type }) => {

	const [providers, setProviders] = useState(null);

	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setUpProviders();
	}, []);
	return (
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
						{type == "login" ? "Log in" : "Sign Up Now"}
					</button>
				))}
		</>
	);
};

export default SignupButton;
