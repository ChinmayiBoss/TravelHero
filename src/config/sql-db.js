import chalk from 'chalk';
import BaseConfig from './base-config';
import { Sequelize } from 'sequelize';
// import User from '../modules/v1/user/models/user-model';
import Admin from '../modules/v1/admin/models/admin-model';
import User from '../modules/v1/user/models/user-model';
import Session from '../modules/v1/admin/models/session-model';
import Country from '../modules/v1/admin/models/country-model';
import State from '../modules/v1/admin/models/states-model';
import City from '../modules/v1/admin/models/cities-model';

// import Session from '../modules/v1/admin/models/session-model';

/**
 * Sequelize configuration class to connect to PostgreSQL using Sequelize
 */
export default class SqlDb extends BaseConfig {
    constructor() {
        super();
        this.models = [
            Admin,
            User,
            Session,
            Country,
            State,
            City
        ];
        this.connectSqlDB();
    }

    /**
     * Connection to PostgreSQL and synchronization of models
     */
    async connectSqlDB() {
        try {
            //set mongoose
            await this.sequelize.authenticate();
            await Promise.all([
                Admin.sync({ alter: true }),
                User.sync({ alter: true }),
                Session.sync({ alter: true })
              ]);
            //   await Country.sync({ alter: true });  // Country first (no dependencies)
            //   await State.sync({ alter: true });    // State next (depends on Country)
              await City.sync({ alter: true });   
              

            console.log(chalk.blueBright.bold.italic('POSTGRE-SQL successfully connected and models synchronized'));
        } catch (err) {
            console.error('POSTGRE-SQL connection or model synchronization failed', err);
        }
    }



}
