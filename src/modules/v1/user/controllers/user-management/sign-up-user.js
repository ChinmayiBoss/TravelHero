import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import User from "../../models/user-model";
import { setToken } from "./send-verification-link";
import mailContent from "../../../../../utils/mail-content";


class SignupController {

    /**
      * @description   api to user signup
      * @param {*} req /api/v1/user/signup
      * @param {*} res 
      */

    async create(req, res) {

        try {
            req.body.password = encrypt(req.body.password)
            const user = (await User.create(req.body)).toJSON()
            if (user) {
                const session = await createSession(user);
                const updates = await setToken(user.email)

                await mailContent.verificationMail(updates)
                const userResponse = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name, 
                    last_name: user.last_name,
                    session_token: session.session_token
                };

                return responseHandler.successResponse(res, userResponse , "Signup successful", 200);
            } else {
                return responseHandler.errorResponse(res, {}, 'signup failed', 400);
            }

        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new SignupController();

