import express from "express";
import {
    AddCity,
    ApproveTurfAdmin,
    BlockGroundResApi,
    CancelTurfAdmin,
    ChatRequestResApi,
    EventDetailFetchResApi,
    FetchAllBookingResApi,
    FindCity,
    GroundListAdminResApi,
    GroundViewResApi,
    OwnerListResApi,
    UnblockGroundResApi,
    adminLogin,
    notificationReqApi,
    userListReqApi,
    UserEventBookingDetailFetchResApi,
} from "../../Controller/Admin/adminController.js";
import { adminVerifyToken } from "../../Middleware/AuthVerify.js";
const router = express.Router();

router.post("/", adminLogin);
router.get("/client-list", adminVerifyToken, userListReqApi);
router.get("/notification", adminVerifyToken, notificationReqApi);
router.post("/approve-turf-admin", adminVerifyToken, ApproveTurfAdmin);
router.post("/cancel-turf-admin", adminVerifyToken, CancelTurfAdmin);
router.get("/find-city", adminVerifyToken, FindCity);
router.post("/add-city", adminVerifyToken, AddCity);
router.get("/ground-list", adminVerifyToken, GroundListAdminResApi);
router.get("/ground-view", adminVerifyToken, GroundViewResApi);
router.patch("/block-ground", adminVerifyToken, BlockGroundResApi);
router.patch("/unblock-ground", adminVerifyToken, UnblockGroundResApi);
router.get("/owner-list", adminVerifyToken, OwnerListResApi);
router.get("/chat-request", adminVerifyToken, ChatRequestResApi);
router.get("/event-detail", adminVerifyToken, EventDetailFetchResApi);
router.get("/fetch-all-booking", adminVerifyToken, FetchAllBookingResApi);
router.get("/event-booking-detail-view", adminVerifyToken, UserEventBookingDetailFetchResApi);

export default router;
