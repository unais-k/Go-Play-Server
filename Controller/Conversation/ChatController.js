import chatModel from "../../Model/Chat.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import notificationModel from "./../../Model/Notification.js";

export const GetMessageResApi = async (req, res, next) => {
    try {
        console.log(new Date(Date.now()));
        console.log(req.params.conversationId, " id");
        const find = await chatModel.find({
            conversationId: req.params.conversationId,
        });
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const AddMessageResApi = async (req, res, next) => {
    try {
        if (req.body.conversationId) {
            const createChat = await chatModel.create({
                sender: req.user.id,
                conversationId: req.body.conversationId,
                text: req.body.text,
            });
            console.log(createChat);
            res.status(201).json({ result: createChat });
        } else {
            res.status(203).json({ msg: "something went wrong" });
        }
        // const newMessage = new Message(req.body);
        // const savedMessage = await newMessage.save();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const GetAdminPermissionResApi = async (req, res, next) => {
    try {
        const find = await TurfAdminModel.findOne({ _id: req.user.id });
        const findUser = await notificationModel.findOne({ sender: req.user.id });
        const findUser1 = await notificationModel.findOne({ sender: req.user.id, status: true });
        if (findUser1) res.status(202).json({ result: findUser1 });

        if (!findUser) {
            const notifiCation = await notificationModel.create({
                sender: req.user.id,
                name: find.name,
                status: false,
            });
            res.status(201).json({ result: notifiCation });
        } else if (findUser) {
            res.status(203).json({ status: "OK" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
