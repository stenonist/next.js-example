import Link from "next/link";

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
	return (
		<section className="w-full flex-col">
			<h1>
				<span className="text-primary">{type}</span> Post
			</h1>
			<p>{type} a post and share it</p>
			<form
				onSubmit={handleSubmit}
				className="mt-10 w-full flex sm:w-2/3 mx-auto lg:w-1/2 xl:w-1/4 flex-col gap-4"
			>
				<label className="flex flex-col">
					<span className="font-semibold text-base text-gray-700">
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
					<span className="font-semibold text-base text-gray-700">
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
                <div className='flex-row flex items-center justify-end gap-4'>
                    <Link href='/posts' className='btn-ghost'>
                        Cancel
                    </Link>

                    <button
                        type='submit'
                        disabled={submitting}
                        className='btn'
                    >
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
			</form>
		</section>
	);
};

export default Form;
