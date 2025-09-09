import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import Admin from "../../models/admin-model";
const fs = require('fs');
const path = require('path');
import Country from "../../models/country-model";
import BaseConfig from '../../../../../config/base-config';
// import filePath from "../../json-file/countries.json"

const config = new BaseConfig();

class CountryUpdateController {

    /**
      * @description   API for admin add country
      * @param {*} req /api/v1/admin/add-country
      * @param {*} res 
      */
    async create(req, res) {

        try {

            const filePath = path.resolve(process.env.COUNTRY_FILE_PATH)

            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return res.status(500).send('Error reading file');
                }

                try {
                    const countries = JSON.parse(data);

                    // Start a transaction to ensure all or nothing
                    await config.sequelize.transaction(async (t) => {
                        for (const country of countries) {
                            await Country.create({
                                id: country.id,
                                name: country.name,
                                data: {
                                    iso3: country.iso3,
                                    iso2: country.iso2,
                                    numeric_code: country.numeric_code,
                                    phone_code: country.phone_code,
                                    currency: country.currency,
                                    currency_symbol: country.currency_symbol,
                                    is_state: country.is_state
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

export default new CountryUpdateController();
