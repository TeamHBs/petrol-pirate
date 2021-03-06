const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Station extends Model {}

Station.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'stations',
    }
);

module.exports = Station;

// created_at: {
//   type: DataTypes.DATE,
//   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//   allowNull: false,
// },
// updated_at: {
//   type: DataTypes.DATE,
//   defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//   allowNull: false,
// },
