import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "conversation",
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
