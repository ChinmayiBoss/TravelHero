import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config';

const config = new BaseConfig(); // Import your Sequelize instance
class State extends Model { }

State.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Countries',
      key: 'id'
    }
  },

}, {
  sequelize: config.sequelize,
  modelName: 'State',
  tableName: 'states',
  timestamps: false
});

export default State;
