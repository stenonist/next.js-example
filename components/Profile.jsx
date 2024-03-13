import ItemCard from "./ItemCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
	return (
		<section className="flex flex-col w-full">
			<h1>{name} Profile</h1>
			<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
				{data.map((post) => (
					<ItemCard
						key={post._id}
						post={post}
						handleEdit={() => {
							handleEdit && handleEdit(post);
						}}
						handleDelete={() => {
							handleDelete && handleDelete(post);
						}}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
