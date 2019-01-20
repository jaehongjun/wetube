import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "text Is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    video: {
        // 시퀀스
        type: mongoose.Schema.Types.ObjectId,
        // 참조
        ref: "Video"
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    }    
})

const model = mongoose.model("Comment", CommentSchema);
export default model;