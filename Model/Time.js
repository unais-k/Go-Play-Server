import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    index: {
        type: String,
    },
    time: {
        type: String,
    },
    status: {
        type: Boolean,
    },
    isSelected: {
        type: Boolean,
    },
});

const timeModel = mongoose.model("time", timeSchema);
export default timeModel;
