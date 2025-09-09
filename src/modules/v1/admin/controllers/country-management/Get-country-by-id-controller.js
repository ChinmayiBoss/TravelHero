import { responseHandler } from "../../../../../utils/response-handler";
import Country from "../../models/country-model";


class GetCountryController {

  

    /**
      * @description   api to get country details
      * @param {*} req /api/v1/admin/get-country/:id
      * @param {*} res 
      */

    async get(req, res) {

        try {
            let id = req.query.id
            if (!id) {
                id = 174  // statically mentioned phillipines country code
            }

            const result = await Country.findByPk(id)
            if(result){
                return responseHandler.successResponse(res, result, "Fetched successfully", 200);
            } else{
                return responseHandler.errorResponse(res, {}, "Country details not found", 400);
            }
        }
        catch (err) {
            console.error(err)
            return responseHandler.errorResponse(res, err);
        }

    }
}

export default new GetCountryController();

