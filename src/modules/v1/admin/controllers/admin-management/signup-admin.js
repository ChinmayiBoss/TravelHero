import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import Admin from "../../models/admin-model";
import BaseConfig from '../../../../../config/base-config';

const config = new BaseConfig();

class SignupController {

    /**
      * @description   API for admin signup
      * @param {*} req /api/v1/admin/signup
      * @param {*} res 
      */
    async create(req, res) {
        let transaction;
        try {
            transaction = await config.sequelize.transaction();
            console.log('Admin Model:', Admin); // Debugging: Check if Admin is defined

            req.body.password = encrypt(req.body.password);

            // Ensure Admin.create is available
            if (typeof Admin.create !== 'function') {
                console.log('Admin.create is not a function');
            }
           
            const admin = (await Admin.create(req.body, { transaction })).toJSON();
            delete admin.password; // Removed in response

            if (admin) {
                const session = await createSession(admin);
                await transaction.commit();
                return responseHandler.successResponse(res, { ...admin, session_token: session.session_token }, "Signup successful", 201);
            } else {
                await transaction.rollback();
                return responseHandler.errorResponse(res, {}, "Admin creation failed", 400);
            }
        } catch (err) {
            
            if (transaction) await transaction.rollback();
            console.error('Error:', err); // Debugging: Log error details
            return responseHandler.errorResponse(res, { message: err.message || 'An unexpected error occurred' });
        }
    }
}

export default new SignupController();
