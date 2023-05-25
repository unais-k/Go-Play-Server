import express from "express";
import { TurfAdminLogin, TurfAdminRegister } from "../../Controller/TurfAdmin/AuthController.js";
import {
    AddEventResApi,
    AddPhotoOnGroundPostApi,
    AdminEditResApi,
    AvailableStatusChangeResApi,
    BookingListResApi,
    BookingStatusSetResApi,
    CanceledTimeResApi,
    EditEventResApi,
    EditProfilePhotoResApi,
    EventDetailFetchResApi,
    EventFetchOnSelectResApi,
    FindCity,
    FindReviewResApi,
    GroundDetailSubmitResApi,
    GroundFetchOnSelectResApi,
    GroundListResApi,
    GroundViewResApi,
    OnDateBookedResApi,
    OwnerDataFetchResApi,
    PaymentStatusSetResApi,
    RuleAddResApi,
    RuleDeleteResApi,
    RuleFindResApi,
    RuleUpdateFindResApi,
    RuleUpdateResApi,
    SelectTypeResApi,
    SelectedTimeResApi,
    SubmitBookingAdminResApi,
    TimeSaveOnEventResApi,
    addGroundReq,
} from "../../Controller/TurfAdmin/TurfAdminController.js";
import { turfAdminVerifyToken } from "../../Middleware/AuthVerify.js";

const router = express.Router();

router.post("/login", TurfAdminLogin);
router.post("/register", TurfAdminRegister);
// auth ----------

router.post("/ground-add", turfAdminVerifyToken, addGroundReq);
router.get("/ground-list", turfAdminVerifyToken, GroundListResApi);
router.get("/ground-view", turfAdminVerifyToken, GroundViewResApi);
router.get("/find-city", turfAdminVerifyToken, FindCity);
router.patch("/available-status", turfAdminVerifyToken, AvailableStatusChangeResApi);
router.get("/rule-fetch", turfAdminVerifyToken, RuleFindResApi);
router.post("/rule-add", turfAdminVerifyToken, RuleAddResApi);
router.delete("/rule-delete", turfAdminVerifyToken, RuleDeleteResApi);
router.get("/rule-update-find", turfAdminVerifyToken, RuleUpdateFindResApi);
router.patch("/rule-update", turfAdminVerifyToken, RuleUpdateResApi);
router.post("/selected-time-slot", turfAdminVerifyToken, SelectedTimeResApi);
router.post("/add-event", turfAdminVerifyToken, AddEventResApi);
router.post("/edit-event", turfAdminVerifyToken, EditEventResApi);
router.post("/canceled-time-slot", turfAdminVerifyToken, CanceledTimeResApi);
router.post("/ground-detail-form-submit", turfAdminVerifyToken, GroundDetailSubmitResApi);
router.post("/add-time-on-event", turfAdminVerifyToken, TimeSaveOnEventResApi);
router.get("/event-detail", turfAdminVerifyToken, EventDetailFetchResApi);
router.get("/owner-data", turfAdminVerifyToken, OwnerDataFetchResApi);
router.post("/photo-add-on-ground", turfAdminVerifyToken, AddPhotoOnGroundPostApi);
router.get("/booking-list", turfAdminVerifyToken, BookingListResApi);
router.patch("/payment-status-set", turfAdminVerifyToken, PaymentStatusSetResApi);
router.patch("/booking-status-set", turfAdminVerifyToken, BookingStatusSetResApi);
router.get("/review-fetch", turfAdminVerifyToken, FindReviewResApi);
router.post("/profile-edit", turfAdminVerifyToken, AdminEditResApi);
router.get("/ground-sport-type", turfAdminVerifyToken, SelectTypeResApi);
router.patch("/profile-photo-edit", turfAdminVerifyToken, EditProfilePhotoResApi);
router.get("/selected-type", turfAdminVerifyToken, GroundFetchOnSelectResApi);
router.get("/event-fetch", turfAdminVerifyToken, EventFetchOnSelectResApi);
router.get("/date-event-fetch", turfAdminVerifyToken, OnDateBookedResApi);
router.get("/admin-home-page", turfAdminVerifyToken);
router.post("/handle-submit-admin", turfAdminVerifyToken, SubmitBookingAdminResApi);

export default router;
