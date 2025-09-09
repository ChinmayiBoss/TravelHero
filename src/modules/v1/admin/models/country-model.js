import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config';

const config = new BaseConfig(); // Import your Sequelize instance

class Country extends Model {}

Country.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data: {
        type: DataTypes.JSONB, // Use JSONB for PostgreSQL, JSON for other databases
        allowNull: false,
      },
  },
  {
    sequelize: config.sequelize, 
    modelName: 'Country', // Name of the model
    tableName: 'Countries', // The name of the table in the database
    timestamps: false
    
  }
);

export default Country;

