import ItemCard from "./ItemCard";

const ProfileComp = ({ name, data, handleEdit, handleDelete }) => {
	return (
		<section className="flex flex-col w-full">
			<h1>{name} Profile</h1>
			<div className="grid grid-cols-1 gap-5 mt-16 sm:grid-cols-2 lg:grid-cols-4">
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

export default ProfileComp;
