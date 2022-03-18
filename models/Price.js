const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Price extends Model {}

Price.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        price: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
        },
        station_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stations',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
        updated_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        modelName: 'price',
    }
);

module.exports = Price;
