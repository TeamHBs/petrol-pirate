const User = require('./User');
const Station = require('./Station');
const Price = require('./Price');

User.hasMany(Price, {
    foreignKey: 'user_id',
});

Price.belongsTo(User, {
    foreignKey: 'user_id',
});

Station.hasMany(Price, {
    foreignKey: 'station_id',
});

Price.belongsTo(Station, {
    foreignKey: 'station_id',
});

module.exports = { User, Station, Price };
