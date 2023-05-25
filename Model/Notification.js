import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "turf-admin",
        },
        status: {
            type: Boolean,
        },
        name: {
            type: String,
        },
    },
    { timestamps: true }
);
const notificationModel = mongoose.model("notification", notificationSchema);

export default notificationModel;
