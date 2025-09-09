import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config'; // Import your Sequelize instance

const config = new BaseConfig();// Import your Sequelize instance
/**
 * User model definition
 */
class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.UUID, // Ensure UUID type for UUID columns
            defaultValue: DataTypes.UUIDV4, // Automatically generate UUIDv4
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(255),
        },
        last_name: {
            type: DataTypes.STRING(255)
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: 'Email must not be empty'
                }
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Password must not be empty'
                }
            }
        },
        contact_number: {
            type: DataTypes.STRING(255)
        },
        address: {
            type: DataTypes.STRING(255)
        },
        status: {
            type: DataTypes.STRING(255),
            defaultValue: true
        },
        firebase_uid: {
            type: DataTypes.STRING(255)
        },
        kyc_document: {
            type: DataTypes.JSONB
        },
        phone_number: {
            type: DataTypes.STRING(255)
        },
        kyc_verified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        email_verified: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        reset_token: {
            type: DataTypes.STRING
        },
        token_expires: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        sequelize: config.sequelize,  // Pass the Sequelize instance
        modelName: 'User', // Name of the model
        tableName: 'Users', // Name of the table in the database
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        underscored: true, // Converts camelCase to snake_case in column names
        version: false // Disable the versionKey (equivalent to versionKey: false in Mongoose)
    }
);

export default User;
