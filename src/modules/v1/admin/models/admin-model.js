import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config';

const config = new BaseConfig(); // Import your Sequelize instance

class Admin extends Model {}

Admin.init(
  {
    id: {
      type: DataTypes.UUID, // Ensure UUID type for UUID columns
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDv4
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: config.sequelize, 
    modelName: 'Admin', // Name of the model
    tableName: 'Admins', // The name of the table in the database
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

export default Admin;
