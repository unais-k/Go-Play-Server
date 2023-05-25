import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        turf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ground",
        },
        bookDate: { type: String },
        time: [
            {
                timeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "event.slots",
                },
                slots: {
                    type: String,
                },
                price: {
                    type: String,
                },
            },
        ],
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "event",
        },
        offerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "offer",
        },
        payment: { type: String },
        advance: { type: String },
        sport: { type: String },
        advance: { type: String },
        total: { type: String },
        name: { type: String },
        bookingType: { type: String },
        phone: { type: String },
        bookingStatus: { type: Boolean },
        paymentId: { type: String },
        status: { type: String },
        review: { type: Boolean, default: false },
        offer: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const bookingModel = mongoose.model("booking", bookingSchema);
export default bookingModel;
