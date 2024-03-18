import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        required: [true, "Title is Required"]
    },
    description:{
        type: String,
        required: [true, "Description is Required"]
    },
    photo:{
        type: String,
        required: [true, "Photo is Required"]
    },
})

const Post = models.Post || model('Post', PostSchema);

export default Post;