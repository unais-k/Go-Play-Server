import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: { type: String },
    photo: { type: String },
});

const BannerModel = mongoose.model("banner", bannerSchema);

export default BannerModel;
