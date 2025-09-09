import { responseHandler } from '../../../../../utils/response-handler';
import { createSession, decrypt } from '../../../../../utils/encrypt';
import Admin from '../../models/admin-model';
import BaseConfig from '../../../../../config/base-config';
const config = new BaseConfig()

class LoginController {

    /**
     * @description   api to admin login
     * @param {*} req /api/v1/admin/login
     * @param {*} res 
     */

    async get(req, res) {
        try {
            // Start a transaction
            const transaction = await config.sequelize.transaction();

            try {
                // Find the admin user
                const admin = await Admin.findOne({ where: { email: req.body.email }, transaction })


                // Convert Sequelize model instance to plain object
                const adminData = admin ? admin.toJSON() : null;

                if (!adminData) {
                    // Rollback the transaction if the admin does not exist
                    await transaction.rollback();
                    return responseHandler.errorResponse(res, {}, 'No admin exists with this email', 400);
                }
                // Verify password
                if (decrypt(adminData.password) !== req.body.password) {
                    // Rollback the transaction if the password is incorrect
                    await transaction.rollback();
                    return responseHandler.errorResponse(res, {}, 'Password is incorrect, please try again', 400);
                }

                // Create a session
                const session = await createSession(adminData);

                // Commit the transaction
                await transaction.commit();
                delete adminData.password

                // Respond with success
                return responseHandler.successResponse(res, { ...adminData, session_token: session.session_token }, 'Admin logged in successfully', 200);
            } catch (err) {
                // Rollback the transaction in case of any error
                await transaction.rollback();
                console.error(err);
                return responseHandler.errorResponse(res, err);
            }
        } catch (err) {
            console.error('Transaction error:', err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new LoginController();
