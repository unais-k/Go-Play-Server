import dotenv from "dotenv";
import { default as Twilio } from "twilio";
dotenv.config();
const AccountSID = process.env.AccountSID;
const ServiceSID = process.env.ServiceSID;
const AuthToken = process.env.AuthToken;

const client = Twilio(AccountSID, AuthToken);

client.verify.v2.services.create({ friendlyName: "G E" }).then(() => console.log("OTP Ready"));

export const sendOtp = (mobile) => {
    client.verify.v2
        .services(ServiceSID)
        .verifications.create({ to: `+91${mobile}`, channel: "sms" })
        .then((verification) => console.log(verification.status));
    console.log("send otp function");
    console.log(mobile);
};

export const verifyOtp = (mobile, otp) => {
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(ServiceSID)
            .verificationChecks.create({ to: `+91 ${mobile}`, code: otp })
            .then((verification_check) => {
                console.log(verification_check.status);
                resolve(verification_check);
            });
    });
};
