import mongoose from "mongoose";

const MessageSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'registeruser'
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const message = mongoose.model("MessageSchema", MessageSchema)
export default message
