import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import User from "../../models/user-model";
import { setToken } from "./send-verification-link";
const { Op } = require('sequelize');


class SendForgotPasswordLink {

    /**
     * @description   API for Password Reset Token Link send thorugh Email 
     * @param {*} req /api/v1/user/password-reset-link-mail
     * @param {*} res 
     */

    async update(req, res) {

        try {

            // Find the user by email using Sequelize
            const user = await User.findOne({
                where: {
                    email: req.query.email
                }
            });
            if (!user) return responseHandler.errorResponse(res, {}, "Email not found", 400);
            const updates = await setToken(user.email)
            // send email 
            await mailContent.forgetPassword(updates)
            if (updates) {
                return responseHandler.successResponse(res, {}, "Verification sent successfully", 200);
            } else {
                return responseHandler.errorResponse(res, {}, "Failed to send verification mail", 400);
            }
        }

        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SendForgotPasswordLink();


