import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    City: {
        type: String,
        required: true,
        unique: true,
    },
});

const CityModel = mongoose.model("city", citySchema);

export default CityModel;
