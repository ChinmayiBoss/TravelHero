import { responseHandler } from "../../../../../utils/response-handler";
import User from "../../../user/models/user-model";


class ListUserController {

  

    /**
      * @description   api to list user details
      * @param {*} req /api/v1/user/list-user
      * @param {*} res 
      */

    async list(req, res) {

        try {
            const result = await User.findAll({
                attributes: { 
                    exclude: ['password', "firebase_uid", "kyc_verified" ] // List fields you want to exclude
                }
            });
            
            return responseHandler.successResponse(res, result, "Fetched successfully", 200);
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new ListUserController();

