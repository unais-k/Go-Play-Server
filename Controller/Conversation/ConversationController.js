import mongoose from "mongoose";
import AdminModel from "../../Model/Admin.js";
import chatModel from "../../Model/Chat.js";
import conversationModel from "../../Model/Conversation.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import notificationModel from "./../../Model/Notification.js";
//new conversation

export const NewConversationReqApi = async (req, res, next) => {
    try {
        console.log(req.user.id, "token", req.body.id, "user");
        const find = await conversationModel.findOne({
            members: { $in: [req.body.id] },
        });
        const notify = await notificationModel.findOne({ sender: new mongoose.Types.ObjectId(req.body.id) });
        console.log(notify);
        if (notify) {
            const updateNotify = await notificationModel.updateOne(
                { sender: new mongoose.Types.ObjectId(req.body.id) },
                { $set: { status: true } }
            );
        }
        if (req.body.id) {
            if (find) {
                console.log("user exist");
                res.status(203).json({ result: find, response: true });
            } else {
                console.log("new mem");
                const newConversation = new conversationModel({
                    members: [new mongoose.Types.ObjectId(req.user.id), new mongoose.Types.ObjectId(req.body.id)],
                    status: true,
                });
                const savedConversation = await newConversation.save();

                res.status(201).json({ result: savedConversation, message: "success" });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

//get conversation of a user

export const GetChatResApi = async (req, res, next) => {
    try {
        const conversation = await chatModel.find({
            conversationId: req.params.userId,
        });
        res.status(201).json({ result: conversation });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const GetConversationResApi = async (req, res, next) => {
    try {
        console.log(req.params.userId);
        const conversation = await conversationModel.find({
            members: { $in: [new mongoose.Types.ObjectId(req.params.userId)] },
        });
        res.status(201).json({ result: conversation });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// get owner list to add

export const GetAdminListReqApi = async (req, res, next) => {
    try {
        const find = await AdminModel.find({});
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const GetConversationListResApi = async (req, res, next) => {
    try {
        let check = await TurfAdminModel.aggregate([
            {
                $lookup: {
                    from: "conversations",
                    let: { report_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$report_id", "$members"],
                                },
                            },
                        },
                    ],
                    as: "users",
                },
            },
        ]);

        res.status(201).json({ result: check });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const GetChatWithAdminResApi = async (req, res, next) => {
    try {
        const check = await conversationModel.findOne({ members: { $in: [new mongoose.Types.ObjectId(req.user.id)] } });
        res.status(201).json({ result: check });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};
