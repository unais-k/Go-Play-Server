import mongoose from "mongoose";
import CityModel from "../../Model/City.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import { cloudinary } from "../../Utils/Cloudinary.js";
import GroundModel from "./../../Model/Grounds.js";
import eventModel from "../../Model/Events.js";
import bookingModel from "./../../Model/Booking.js";
import reviewModel from "../../Model/Review.js";
import UserModel from "./../../Model/Client.js";
import moment from "moment";

export const addGroundReq = async (req, res, next) => {
    try {
        console.log(req.body);
        const { state, place, nearCity, address, phone, email, pinCode, picturePath, name } = req.body;
        const id = req.user.id;
        console.log(id);
        const Profile = "profile";
        const result = await cloudinary.uploader
            .upload(picturePath, {
                folder: Profile,
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err);
            });
        const newGround = new GroundModel({
            name,
            email,
            address,
            nearCity: nearCity,
            images: result.secure_url,
            Owner: id,
            pinCode,
            place,
            phone,
            state,
        });
        await newGround.save();

        const find = await GroundModel.find({ Owner: req.user.id });

        res.status(200).json({ message: "Ground created", result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const FindCity = async (req, res, next) => {
    try {
        const find = await CityModel.find({});
        console.log(find);
        res.status(200).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error });
    }
};

export const GroundListResApi = async (req, res, next) => {
    try {
        const id = req.user.id;
        const find = await GroundModel.find({ Owner: id });
        res.status(201).json({ result: find, message: "Full list" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const GroundViewResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        const find = await GroundModel.findOne({ _id: id }).populate("Owner");

        const events = await eventModel.find({ groundId: id });
        res.status(201).json({ result: find, event: events });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const AvailableStatusChangeResApi = async (req, res, next) => {
    try {
        const id = req.query.id;

        const updateStatus = await GroundModel.findOneAndUpdate(
            { _id: id },
            { $set: { status: req.body.toggle } },
            { new: true }
        );

        res.status(200).json({ result: updateStatus });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const RuleFindResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        const find = await GroundModel.findOne({ _id: id });
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const RuleAddResApi = async (req, res, next) => {
    try {
        const id = req.body.data.id;
        const data = req.body.data;

        const response = await GroundModel.updateOne(
            { _id: id },
            { $addToSet: { rules: { task: data.task, index: data.index } } }
        );

        const find = await GroundModel.find({ _id: id });

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const RuleDeleteResApi = async (req, res, next) => {
    try {
        const data = req.body;
        const { id, index } = req.query;

        const response = await GroundModel.findOneAndUpdate(
            { _id: id, "rules._id": index },
            { $pull: { rules: { _id: index } } },
            { new: true }
        );

        const find = await GroundModel.find({ _id: req.query.id });
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const RuleUpdateFindResApi = async (req, res, next) => {
    try {
        const id = req.query.id;

        const find = await GroundModel.findOne({
            _id: id,
            "rules.index": req.query.index,
        });

        res.status(201).json({ result: find.rules[req.query.index - 1] });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const RuleUpdateResApi = async (req, res, next) => {
    try {
        const index = req.body.data.index;
        const id = req.body.id;
        const response = await GroundModel.findOneAndUpdate(
            { _id: id, "rules.index": index },
            { $set: { "rules.$.task": req.body.data.task } },
            { new: true }
        );

        const find = await GroundModel.find({});

        res.status(202).json({ result: response });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const SelectedTimeResApi = async (req, res, next) => {
    try {
        const { id, groundId } = req.body;

        const findGround = await eventModel.findOneAndUpdate(
            { _id: groundId, "slots._id": id },
            { $set: { "slots.$.status": true } },
            { new: true }
        );
        console.log(findGround);

        res.status(200).json({ result: findGround.slots });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const CanceledTimeResApi = async (req, res, next) => {
    try {
        const { id, groundId } = req.body;
        const findGround = await eventModel.findOneAndUpdate(
            { _id: groundId, "slots._id": id },
            { $set: { "slots.$.status": false } },
            { new: true }
        );
        res.status(200).json({ result: findGround.slots });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const GroundDetailSubmitResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        const { startingTime, closingTime } = req.body.data;
        const updateGroundDetail = await GroundModel.updateOne(
            { _id: id },

            {
                $set: {
                    startingTime: startingTime,
                    closingTime: closingTime,
                    holiday: req.body.holiday,
                    sport: req.body.sport,
                },
            }
        );

        const find = await GroundModel.findOne({ _id: id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const AddEventResApi = async (req, res, next) => {
    try {
        const groundId = req.body.groundId;
        const data = req.body.data;
        console.log(req.body.sport);
        const find = new eventModel({
            groundId: groundId,
            eventAvailable: req.body.sport,
            price: data.price,
            priceAtNight: data.priceAtNight,
            size: data.size,
            eventStatus: false,
            type: data.type,
            groundName: data.groundName,
            slots: req.body.slots,
        });
        await find.save();
        const eventAdd = await GroundModel.findOneAndUpdate({ _id: groundId }, { $push: { events: find._id } });

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const EditEventResApi = async (req, res) => {
    try {
        console.log(req.body);
        const data = req.body.data;
        const set = await eventModel.updateOne(
            { _id: req.body.eventId },
            {
                $set: {
                    groundName: data.groundName,
                    size: data.size,
                    type: data.type,
                    price: data.price,
                    priceAtNight: data.priceAtNight,
                    eventAvailable: req.body.sport,
                },
            }
        );
        res.status(201).json({ status: "ok" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const TimeSaveOnEventResApi = async (req, res, next) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const EventDetailFetchResApi = async (req, res, next) => {
    try {
        console.log(req.body);
        const id = req.query.id;
        const findDetail = await eventModel.findOne({ _id: id }).populate("groundId");

        res.status(201).json({ result: findDetail });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const OwnerDataFetchResApi = async (req, res, next) => {
    try {
        const id = req.user.id;
        const find = await TurfAdminModel.findOne({ _id: id });
        const ground = await GroundModel.find({ Owner: id });
        res.status(201).json({ result: find, ground: ground });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const AddPhotoOnGroundPostApi = async (req, res, next) => {
    try {
        const { photo, groundId } = req.body;

        const Profile = "profile";
        const result = await cloudinary.uploader
            .upload(photo, {
                folder: Profile,
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err);
            });

        const updatePhoto = await GroundModel.updateOne({ _id: groundId }, { $push: { images: result.secure_url } });
        res.status(201).json({ msg: "Photo added" });
        // const find = await eventModel.findOne({ _id: eventId });
        // const addToGround = await GroundModel.updateOne({ _id: find.groundId }, { $push: { images: result.secure_url } });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const BookingListResApi = async (req, res, next) => {
    try {
        const groundArray = [];
        const id = req.user.id;
        let groundId = [];
        const find = await GroundModel.find({ Owner: id });
        for (let i = 0; i < find.length; i++) {
            groundId.push(find[i]._id);
        }
        let AllBooking = [];
        const inBook = await bookingModel
            .aggregate([
                {
                    $match: {
                        turf: {
                            $in: groundId,
                        },
                    },
                },
            ])
            .sort({ _id: -1 });
        await bookingModel.populate(inBook, {
            path: "turf",
        });
        await bookingModel.populate(inBook, {
            path: "event",
        });
        await bookingModel.populate(inBook, {
            path: "client",
        });
        console.log(inBook);

        res.status(201).json({ result: inBook });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const PaymentStatusSetResApi = async (req, res, next) => {
    try {
        console.log(req.body);
        const find = await bookingModel
            .findOneAndUpdate({ _id: req.body.id }, { $set: { payment: req.body.value } })
            .populate("turf")
            .populate("event")
            .populate("client");

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const BookingStatusSetResApi = async (req, res, next) => {
    try {
        const find = await bookingModel
            .findOneAndUpdate({ _id: req.body.id }, { $set: { status: req.body.value } })
            .populate("turf")
            .populate("event")
            .populate("client");

        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const FindReviewResApi = async (req, res, next) => {
    try {
        let turfId = [];
        const find = await GroundModel.find({ Owner: req.user.id });
        for (let i = 0; i < find.length; i++) {
            turfId.push(find[i]._id);
        }
        const agg = await reviewModel.aggregate([
            {
                $match: {
                    turf: {
                        $in: turfId,
                    },
                },
            },
        ]);
        let reviewId = [];
        for (let i = 0; i < agg.length; i++) {
            const finding = await reviewModel
                .findOne({ _id: agg[i]._id })
                .populate("turf")
                .populate("client")
                .populate("bookingId");
            reviewId.push(finding);
        }

        res.status(201).json({ result: reviewId });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const AdminEditResApi = async (req, res, next) => {
    try {
        console.log(req.body, "req.body");
        const { name, email, phone, aadhar, pan } = req.body;
        const updateProfile = await TurfAdminModel.updateMany(
            { _id: req.user.id },
            { $set: { name: name, email: email, phone: phone, aadhar: aadhar, pan: pan } }
        );
        console.log(updateProfile, "updated data");
        res.status(201).json({ result: updateProfile });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const EditProfilePhotoResApi = async (req, res, next) => {
    try {
        const { photo } = req.body;
        const Profile = "profile";
        const result = await cloudinary.uploader
            .upload(photo, {
                folder: Profile,
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err);
            });
        const updateProfile = await TurfAdminModel.findByIdAndUpdate(
            { _id: req.user.id },
            { $set: { profile: result.secure_url } }
        );
        res.status(201).json({ result: updateProfile });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

function multiIntersect(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (i !== j) {
                continue;
            }
            result = result.concat(arr[i].filter((value) => arr[j].includes(value)));
        }
    }
    return Array.from(new Set(result));
}

export const SelectTypeResApi = async (req, res, next) => {
    try {
        const id = req.query.id;
        let event = [];
        const find = await eventModel.find({ groundId: id });
        for (let i = 0; i < find.length; i++) {
            event.push(find[i].eventAvailable);
        }
        const concatArray = multiIntersect(event);

        res.status(201).json({ result: concatArray });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const GroundFetchOnSelectResApi = async (req, res, next) => {
    try {
        const matchGround = await eventModel.aggregate([
            {
                $match: {
                    groundId: new mongoose.Types.ObjectId(req.query.id),
                    eventAvailable: req.query.data,
                },
            },
        ]);

        res.status(201).json({ result: matchGround });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const EventFetchOnSelectResApi = async (req, res, next) => {
    try {
        const findEvent = await eventModel.findOne({ _id: req.query.id });
        const slotsAvailable = findEvent.slots;

        const slow = await slotsAvailable.filter((e) => e.status === true);
        res.status(201).json({ result: findEvent, slots: slow });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const OnDateBookedResApi = async (req, res, next) => {
    try {
        const date = new Date(req.query.date);
        console.log(req.query.date);
        const isoDate = date.toISOString().split("T")[0];
        const selectedTime = [];
        const find = await bookingModel.find({ event: req.query.id, bookDate: isoDate });

        for (let i = 0; i < find.length; i++) {
            selectedTime.push(find[i].time);
        }
        const combinedArray = selectedTime.reduce((acc, curr) => acc.concat(curr), []);
        console.log(combinedArray);
        res.status(201).json({ result: find, time: combinedArray });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const SubmitBookingAdminResApi = async (req, res, next) => {
    try {
        console.log(req.body);
        const { price, eventId, groundId, sport, name, phone } = req.body;
        const dateString = req.body.date;
        const dateObject = moment.utc(dateString).add(1, "days");
        const formattedISOString = dateObject.toISOString();

        const date = new Date(formattedISOString);
        const formattedDate = date.toISOString().split("T")[0];

        const booking = await bookingModel.create({
            name: name,
            total: price,
            phone: phone,
            bookDate: formattedDate,
            sport: sport,
            bookingType: "Admin",
            status: "Pending",
            event: eventId,
            turf: groundId,
            time: req.body.time[0],
        });
        console.log(booking, "booking");
        res.status(201).json({ result: booking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const AdminHomePageResApi = async (req, res, next) => {
    try {
        const findBooking = await bookingModel.find({});
        const findClient = await UserModel.find({});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};
