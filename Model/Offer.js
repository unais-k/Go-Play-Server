import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
    {
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        turf: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ground",
        },
        bookDate: { type: Array },
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
        payment: { type: String },
        offer: { type: String },
        advance: { type: String },
        sport: { type: String },
        advance: { type: String },
        bookingStatus: { type: Boolean },
        total: { type: String },
        paymentId: { type: String },
        status: { type: String },
        review: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const OfferModel = mongoose.model("offer", offerSchema);
export default OfferModel;
