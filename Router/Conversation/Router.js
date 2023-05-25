import express from "express";
import {
    GetChatResApi,
    GetChatWithAdminResApi,
    GetConversationListResApi,
    GetConversationResApi,
    NewConversationReqApi,
} from "../../Controller/Conversation/conversationController.js";
import { ChatVerificationToken } from "../../Middleware/AuthVerify.js";
const router = express.Router();

router.post("/add-conversation", ChatVerificationToken, NewConversationReqApi);
router.get("/get-message/:userId", ChatVerificationToken, GetChatResApi);
router.get("/get-conversation/:userId", ChatVerificationToken, GetConversationResApi);
router.get("/get-admin", ChatVerificationToken, GetChatWithAdminResApi);
router.get("/get-conversation-list", ChatVerificationToken, GetConversationListResApi);

export default router;
