import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registeruser',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registeruser',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);
export default Message;
