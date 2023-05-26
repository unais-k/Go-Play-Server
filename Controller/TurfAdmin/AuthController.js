import { generateToken } from "../../Middleware/AuthVerify.js";
import TurfAdminModel from "../../Model/TurfAdmin.js";
import bcrypt from "bcrypt";
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
