const User = require('./User');
const Station = require('./Station');
const Price = require('./Price');

User.belongsToMany(Price, {
    foreignKey: 'user_id',
    through: Price,
});

Station.belongsToMany(Price, {
    foreignKey: 'station_id',
    through: Price,
});

module.exports = { User, Station, Price };
