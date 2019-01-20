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
    },
    // 일단은 비디오와 게시물 따로 해봄
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }    
})

const model = mongoose.model("Comment", CommentSchema);
export default model;