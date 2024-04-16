"use client"
import Link from "next/link";
import { FileUploader } from "./FileUploader";

const Form = ({
	type,
	post,
	setPost,
	photo,
	setPhoto,
	submitting,
	handleSubmit,
}) => {
	
	return (
		<section className="flex-col w-full">
			<h1>
				<span className="text-primary">{type}</span> Post
			</h1>
			<p>{type} a post and share it</p>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-full gap-4 mx-auto mt-10 sm:w-2/3 lg:w-1/2 xl:w-1/4"
			>
				<label className="flex flex-col">
					<span className="text-base font-semibold text-gray-700">
						Title
					</span>
					<input
						value={post.title}
						onChange={(e) => {
							setPost({ ...post, title: e.target.value });
						}}
						placeholder="Title"
						required
						type="text"
						className="form-input"
					/>
				</label>
				<label className="flex flex-col">
					<span className="text-base font-semibold text-gray-700">
						Description
					</span>
					<textarea
						value={post.description}
						onChange={(e) => {
							setPost({ ...post, description: e.target.value });
						}}
						placeholder="Description"
						required
						type="text"
						className="form-textarea"
					/>
				</label>
				{type === "Create" && (
					<>
						{/* <label className="flex flex-col">
							<span className="text-base font-semibold text-gray-700">
								Photo
							</span>
							<input
								id="fileInput"
								type="file"
								onChange={(e) => {
									setPhoto({ photo: e.target.value });
								}}
								placeholder="Photo"
								required
								className="form-input"
							/>
						</label> */}
						<FileUploader 
							setFiles={setPhoto}
						/>
					</>
				)}
				<div className="flex flex-row items-center justify-end gap-4">
					<Link href="/posts" className="btn-ghost">
						Cancel
					</Link>

					<button type="submit" disabled={submitting} className="btn">
						{submitting ? `${type}ing...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
