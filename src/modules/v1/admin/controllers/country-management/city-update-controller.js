import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import Admin from "../../models/admin-model";
const fs = require('fs');
const path = require('path');
import City from "../../models/cities-model";
import BaseConfig from '../../../../../config/base-config';
// import filePath from "../../json-file/countries.json"

const config = new BaseConfig();

class CityUpdateController {

    /**
      * @description   API for admin add City
      * @param {*} req /api/v1/admin/add-City
      * @param {*} res 
      */
    async create(req, res) {

        try {

            const filePath = path.resolve(process.env.CITY_FILE_PATH)

            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return res.status(500).send('Error reading file');
                }

                try {
                    const cities = JSON.parse(data);

                    // Start a transaction to ensure all or nothing
                    await config.sequelize.transaction(async (t) => {
                        for (const city of cities) {
                          
                            await City.create({
                                id: city.id,
                                name: city.name,
                                country_id: city.country_id,
                                state_id: city.state_id,
                                data: {
                                    latitude: city.latitude,
                                    longitude: city.longitude
                                }
                            }, { transaction: t });
                        }
                    });

                    return responseHandler.successResponse(res, [], "success", 201);
                } catch (error) {
                    console.error('Error processing data:', error);
                    return responseHandler.errorResponse(res, { message: err.message || 'Error processing data' });
                }
            })


        } catch (err) {
            console.error('Error:', err); // Debugging: Log error details
            return responseHandler.errorResponse(res, { message: err.message || 'An unexpected error occurred' });
        }
    }
}

export default new CityUpdateController();
