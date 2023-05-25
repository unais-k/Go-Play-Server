import jwt from "jsonwebtoken";

export const clientVerifyToken = async (req, res, next) => {
    let token = req.header("Authorization");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        if (verified.role === "clientLogin") {
            next();
        } else {
            res.status(404).json({ message: "Authentication failed: invalid token." });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const adminVerifyToken = async (req, res, next) => {
    let token = req.header("Authorization");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        if (verified.role === "adminLogin") {
            next();
        } else {
            res.status(404).json({ message: "Authentication failed: invalid token." });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const turfAdminVerifyToken = async (req, res, next) => {
    let token = req.header("Authorization");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        if (verified.role === "turfAdminLogin") {
            next();
        } else {
            res.status(404).json({ message: "Authentication failed: invalid token." });
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const ChatVerificationToken = async (req, res, next) => {
    let token = req.header("Authorization");

    try {
        if (!token) return res.status(404).json({ message: "Authentication failed: no token provided." });

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Authentication failed: invalid token." });
    }
};

export const generateToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET);
    return token;
};
