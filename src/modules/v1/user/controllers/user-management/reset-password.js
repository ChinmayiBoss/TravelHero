import { encrypt } from "../../../../../utils/encrypt";
import mailContent from "../../../../../utils/mail-content";
import { responseHandler } from "../../../../../utils/response-handler";
import User from "../../models/user-model";


class ResetUserPasswordController {

    /**
      * @description   api to update user 
      * @param {*} req /api/v1/user/update
      * @param {*} res 
      */

    async update(req, res) {

        try {
            // Update the user and check if the update was successful
            const [affectedRows] = await User.update(
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
                            [Op.gt]: Date.now() // Ensure the token has not expired
                        },
                    },
                }
            );

            // Check if any rows were affected
            if (affectedRows === 0) {
                return responseHandler.errorResponse(res, {}, 'Password reset token is invalid or has expired.', 400);
            }

            // Retrieve the updated user
            const updatedUser = await User.findOne({
                where: {
                    id: req.params.id
                }
            });
            mailContent.passwordResetSuccess(updatedUser)
            return responseHandler.successResponse(res, updatedUser, "User email verified", 200);

        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ResetUserPasswordController();

