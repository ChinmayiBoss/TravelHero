import { responseHandler } from "../../../../../utils/response-handler";
import User from "../../models/user-model";
const { Op } = require('sequelize');

class VerifyEmail {

    /**
     * @description   API to reset password of user
     * @param {*} req /api/v1/user/password-reset-confirmation-mail/nckjeqdho32ou2098282
     * @param {*} res 
     */

    async update(req, res) {

        try {
            // Check reset token and change email_verified key true
            const updatedUser = await User.update(
                {
                    reset_token: null,
                    token_expires: null,
                    email_verified: true,
                },
                {
                    where: {
                        id: req.params.id,
                        reset_token: req.body.token,
                        token_expires: {
                            [Op.gt]: Date.now(), // Ensure the token has not expired
                        },
                    },
                    returning: true, // Get the updated user data
                }
            );
        
            const [affectedRows, updatedUsers] = updatedUser;
        
            if (affectedRows === 0) {
                return responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400);
            }
            return responseHandler.successResponse(res, updatedUsers[0], 'User email verified', 200);

        } catch (err) {
            console.error(err);
            responseHandler.errorResponse(res, err);
        }

    }
}

export default new VerifyEmail();




