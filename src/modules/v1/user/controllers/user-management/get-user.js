import { responseHandler } from "../../../../../utils/response-handler";
import User from "../../models/user-model";


class GetUserController {

    /**
      * @description   api to get user details
      * @param {*} req /api/v1/user/get-user/:id
      * @param {*} res 
      */

    async get(req, res) {

        try {
            const user = await User.findByPk(req.params.id)
            if(user){

                const userResponse = {
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name, 
                    last_name: user.last_name,
                    contact_number: user.contact_number,
                    address: user.address
                };
                return responseHandler.successResponse(res, userResponse, "User details retrived successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "User details not found", 400);
            }
        }
        catch (err) {
            console.error(err);
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new GetUserController();

