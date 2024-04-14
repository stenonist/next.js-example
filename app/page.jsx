import Link from "next/link";
import Image from "next/image";
import SignupButton from "@components/SignupButton";

const Home = () => {
	return (
		<section className="w-full">
			<div
				className="min-h-[calc(100vh-58px)] mainCont relative flex flex-col justify-center"
				id="homeLanding"
			>
				<Image
					className="absolute top-0 bottom-0 right-0 w-3/4"
					src="/assets/images/bg-1.jpg"
                    alt="img"
                    width="2000"
                    height="1000"
				/>
				<h1 className="m-0 text-7xl drop-shadow-lg">Social Media</h1>
				<h2 className="m-0 text-5xl drop-shadow-lg">
					Without the adds
				</h2>
			</div>
			<div
				className="relative bg-gray-400 "
				id="adLanding"
			>
				<Image
					className="absolute top-0 bottom-0 left-0 w-2/4 h-full"
					src="/assets/images/bg-ads1.jpg"
                    alt="img"
                    width="2000"
                    height="1000"
				/>
                <div className="flex flex-col items-end justify-center w-1/2 ml-auto gap-36 py-28 mainCont">
                    <p className="text-3xl text-right drop-shadow-lg">
                        We got bored of constantly seeing ads and sponsored posts
                        all over our Social Feed.
                    </p>
                    <p className="text-3xl text-right drop-shadow-lg">
                        So what we've done is made our own!
                    </p>
                    <p className="text-3xl text-right drop-shadow-lg">
                        No need to pay any subscription or mess around with
                        settings.
                    </p>

                </div>
			</div>
			<div
				className="relative flex flex-col items-start justify-center gap-32 bg-white mainCont py-80"
				id="logoLanding"
			>
				<Image
					className="absolute top-0 bottom-0 right-0 w-3/4"
					src="/assets/images/bg-logo.jpg"
                    alt="img"
                    width="2000"
                    height="1000"
				/>
				<p className="flex flex-col w-1/2 text-3xl text-left">
					<span className="text-5xl">Social media</span> the right
					way...
				</p>
				<SignupButton type="signup" />
			</div>
		</section>
	);
};

export default Home;
