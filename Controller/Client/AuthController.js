import UserModel from "../../Model/Client.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../Middleware/AuthVerify.js";
import { sendOtp, verifyOtp } from "../../Utils/Otp.js";
export const userLogin = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        console.log(user, "user");
        if (!user) return res.status(401).json({ message: "Invalid credentials." }); // 401 Unauthorized
        const isMatch = await bcrypt.compare(password, user.password).catch((err) => next(err));
        console.log(isMatch, "password match");
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials.." });
        const token = generateToken({ id: user._id, role: "clientLogin" });
        console.log(token, "Token ------ create---");
        res.status(200).json({ token: token, name: user.name, id: user._id }); // 500 server error
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const userRegister = async (req, res, next) => {
    try {
        const { name, password, email, phone } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: "User created" });
    } catch (error) {
        res.sendStatus(500);
    }
};

export const otpSend = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.formData.email }).catch((err) => next(err));
        if (user) return res.status(406).json({ message: "User already exists" }); // 406 not accepted
        const mobile = await UserModel.findOne({ phone: req.body.formData.phone }).catch((err) => next(err));
        if (mobile) return res.status(406).json({ message: "Mobile Number already registered" });
        sendOtp(req.body.formData.phone);
        // console.log("send otp commented");
        return res.status(200).json({
            phone: req.body.formData.phone,
            email: req.body.formData.email,
            name: req.body.formData.name,
            password: req.body.formData.password,
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" });
    }
};

export const otpVerify = async (req, res, next) => {
    try {
        console.log(req.body);
        const { phone, otpValue } = req.body;
        console.log(req.body);
        const response = await verifyOtp(phone, otpValue).catch((error) => next(error));
        if (!response) return res.status(400).json({ message: "Invalid OTP" }); // 400bad request
        else return res.status(200).json({ message: "otp verified" });

        // console.log("Verify otp commented");
        // res.status(200).json({ message: "otp verified" });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error !" });
    }
};

export const FPEmailResApi = async (req, res, next) => {
    try {
        const email = req.body.email;
        const find = await UserModel.findOne({ email: email });
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
        const find = await UserModel.findOne({ phone: phoneNum });
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
        const set = await UserModel.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } });
        res.status(201).json({ result: set, msg: "Success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export const ChangePasswordResApi = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const set = await UserModel.findOneAndUpdate({ _id: req.user.id }, { $set: { password: hashedPassword } });
        res.status(201).json({ result: set, msg: "Success" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};
