import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config';

const config = new BaseConfig(); // Import your Sequelize instance
class City extends Model { }

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'states',
        key: 'id'
      },
      allowNull: false
    },
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Countries', 
        key: 'id'
      },
      allowNull: false
    }
}, {
    sequelize: config.sequelize,
    modelName: 'City',
    tableName: 'cities',
    timestamps: false
  });


export default City;
