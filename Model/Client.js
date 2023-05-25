import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            min: 4,
            max: 30,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
        },
        city: {
            type: String,
        },
        password: {
            type: String,
            min: 5,
            required: true,
        },
        booking: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "booking",
            },
        ],
    },
    { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
