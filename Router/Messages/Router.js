import express from "express";
import { ChatVerificationToken } from "../../Middleware/AuthVerify.js";
import {
    AddMessageResApi,
    GetAdminPermissionResApi,
    GetMessageResApi,
} from "../../Controller/Conversation/ChatController.js";

const router = express.Router();

router.post("/message", ChatVerificationToken, AddMessageResApi);
router.get("/message/:conversationId", ChatVerificationToken, GetMessageResApi);
router.post("/get-admin-permission", ChatVerificationToken, GetAdminPermissionResApi);

export default router;
