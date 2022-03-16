const sequelize = require('../config/connection');
const { User, Station, Price } = require('../models');

const userData = require('./userData.json');
const stationData = require('./stationData.json');
const priceData = require('./priceData.json');

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
