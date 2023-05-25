import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
        status: {
            type: Boolean,
        },
    },
    { timestamps: true }
);
const conversationModel = mongoose.model("conversation", conversationSchema);

export default conversationModel;
