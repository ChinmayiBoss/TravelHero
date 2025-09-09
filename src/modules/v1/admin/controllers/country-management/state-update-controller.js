import { responseHandler } from "../../../../../utils/response-handler";
import { createSession, encrypt } from "../../../../../utils/encrypt";
import Admin from "../../models/admin-model";
const fs = require('fs');
const path = require('path');
import State from "../../models/states-model";
import BaseConfig from '../../../../../config/base-config';
// import filePath from "../../json-file/countries.json"

const config = new BaseConfig();

class StateUpdateController {

    /**
      * @description   API for admin add State
      * @param {*} req /api/v1/admin/add-State
      * @param {*} res 
      */
    async create(req, res) {

        try {

            const filePath = path.resolve(process.env.STATE_FILE_PATH)

            fs.readFile(filePath, 'utf8', async (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return res.status(500).send('Error reading file');
                }

                try {
                    const states = JSON.parse(data);

                    // Start a transaction to ensure all or nothing
                    await config.sequelize.transaction(async (t) => {
                        for (const state of states) {
                            await State.create({
                                id: state.id,
                                name: state.name,
                                country_id: state.country_id
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

export default new StateUpdateController();
