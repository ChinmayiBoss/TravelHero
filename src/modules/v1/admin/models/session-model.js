import { DataTypes, Model } from 'sequelize';
import BaseConfig from '../../../../config/base-config';
const config = new BaseConfig();

class Session extends Model { }

Session.init(
    {
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        session_token: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize: config.sequelize, // Pass the sequelize instance directly
        timestamps: false,
        modelName: 'Session',
        tableName: 'sessions'
    }
);

export default Session;
