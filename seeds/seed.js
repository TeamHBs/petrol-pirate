// utilize sequelize and define models
const sequelize = require('../config/connection');
const { User, Station, Price } = require('../models');
// data to seed
const userData = require('./userData.json');
const stationData = require('./stationData.json');
const priceData = require('./priceData.json');

// adds seed data to the database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    for (const user of userData) {
        await User.create({
            ...user,
        });
    }

    for (const station of stationData) {
        await Station.create({
            ...station,
        });
    }

    for (const price of priceData) {
        await Price.create({
            ...price,
        });
    }

    process.exit(0);
};

seedDatabase();
