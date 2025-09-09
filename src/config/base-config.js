import Express from './express';
import { Sequelize } from 'sequelize';


// Basic configuration 
export default class BaseConfig extends Express {

    constructor() {
        super()
        this.sequelize = new Sequelize({
            database: process.env.POSTGRESQL_DBNAME,
            username: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PASSWORD,
            host: process.env.POSTGRESQL_HOST,
            port: process.env.POSTGRESQL_PORT,
            dialect: process.env.SQL_DB,
            logging: false,
            define: {
                timestamps: true, // Automatically adds createdAt and updatedAt fields
                underscored: true, // Converts camelCase to snake_case in column names
              },
            pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
            }
        });
    }

    
}

