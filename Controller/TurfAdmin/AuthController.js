import { generateToken } from "../../Middleware/AuthVerify.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import bcrypt from "bcrypt";
import { sendOtp, verifyOtp } from "../../Utils/Otp.js";
export const TurfAdminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const verify = await TurfAdminModel.aggregate([{ $match: { email: email, status: true } }]);
        console.log(verify, "verify");
        const check = await TurfAdminModel.findOne({ email: email });
        console.log(check, "check");
        if (!check) res.status(401).json({ message: "Invalid Credential" });

        if (check) {
            const token = await generateToken({ id: check._id, role: "turfAdminLogin" });
            res.status(201).json({ token: token, name: check.name, id: check._id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const TurfAdminRegister = async (req, res, next) => {
    try {
        const { name, email, phone, password, aadhar, pan, profile, place } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new TurfAdminModel({
            name,
            email,
            aadhar,
            place,
            pan,
            profile,
            phone,
            status: false,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: "Owner created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// forgotten password

export const FPEmailResApi = async (req, res, next) => {
    try {
        const email = req.body.email;
        const find = await TurfAdminModel.findOne({ email: email });
        console.log(find);
        // sendOtp(find.phone);
        res.status(201).json({ result: find, msg: "OTP Send" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const FPOtpResApi = async (req, res, next) => {
    try {
        console.log(req.body);
        const { otpValue, phoneNum } = req.body;
        // const response = await verifyOtp(phoneNum, otpValue);
        // if (response.status == "approved") {
        const find = await TurfAdminModel.findOne({ phone: phoneNum });
        //     res.status(201).json({ result: find });
        // } else {
        //     res.status(203).json({ msg: "OTP error" });
        // }
        res.status(201).json({ result: find });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const FPSetResApi = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password.password, salt);
        const set = await TurfAdminModel.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } });
        res.status(201).json({ result: set, msg: "Success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
