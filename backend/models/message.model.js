import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required:true,
        },
        recieverId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "userModel",
            required:true,
        },
        text:{
            type: String,
        },
        image:{
            type: String,
        },
    },
    {timestamps:true}
);
const Message= mongoose.model("Message", messageSchema);
export default Message;