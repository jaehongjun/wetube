import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required!"
    },
    description: String,
    views:{
        type: String,
        default: 0
    },
    imageUrl: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})

const model = mongoose.model("Board", BoardSchema)

export default model;