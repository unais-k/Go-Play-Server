import express from "express";
import {
    ChangePasswordResApi,
    FPEmailResApi,
    FPOtpResApi,
    FPSetResApi,
    otpSend,
    otpVerify,
    userLogin,
    userRegister,
} from "../../Controller/Client/AuthController.js";
import {
    BookingDetailViewResApi,
    BookingSubmitResApi,
    CancelBookingResApi,
    CityListResApi,
    EventDateCheckResApi,
    EventFetchOnSelectResApi,
    EventSubmitResApi,
    FootballGroundResApi,
    GroundFetchOnSelectResApi,
    GroundListResApi,
    GroundViewResApi,
    OnDateBookedResApi,
    SearchGroundResApi,
    SelectTypeResApi,
    SubmitReviewResApi,
    TimeSlotResApi,
    UserBookingDetailFetchResApi,
    UserDataFetchResApi,
    UserEditResApi,
    UserEventBookingDetailFetchResApi,
    UserEventBookingFetchResApi,
} from "../../Controller/Client/ClientController.js";
import { clientVerifyToken } from "../../Middleware/AuthVerify.js";
const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/otp-send", otpSend);
router.post("/otp-verify", otpVerify);
router.patch("/email-check", FPEmailResApi);
router.patch("/otp-check", FPOtpResApi);
router.patch("/forget-password-submit", FPSetResApi);
router.post("/change-password", clientVerifyToken, ChangePasswordResApi);
router.get("/city-list", CityListResApi);
router.get("/ground-list", GroundListResApi);
router.get("/football-ground-list", FootballGroundResApi);
router.get("/ground-view", GroundViewResApi);
router.get("/time-slot", TimeSlotResApi);
router.get("/select-type", SelectTypeResApi);
router.get("/selected-type", GroundFetchOnSelectResApi);
router.get("/event-fetch", EventFetchOnSelectResApi);
router.get("/date-event-fetch", OnDateBookedResApi);
router.post("/booking-submit", clientVerifyToken, BookingSubmitResApi);
router.get("/user-data", clientVerifyToken, UserDataFetchResApi);
router.patch("/user-edit", clientVerifyToken, UserEditResApi);
router.get("/booking-data", clientVerifyToken, UserBookingDetailFetchResApi);
router.get("/booking-detail-view", clientVerifyToken, BookingDetailViewResApi);
router.post("/review-submit", clientVerifyToken, SubmitReviewResApi);
router.get("/search-turf", SearchGroundResApi);
router.patch("/cancel-booking", clientVerifyToken, CancelBookingResApi);
router.post("/event-date-check", clientVerifyToken, EventDateCheckResApi);
router.post("/event-submit", clientVerifyToken, EventSubmitResApi);
router.get("/event-booking-details", clientVerifyToken, UserEventBookingFetchResApi);
router.get("/event-booking-detail-view", clientVerifyToken, UserEventBookingDetailFetchResApi);

export default router;
