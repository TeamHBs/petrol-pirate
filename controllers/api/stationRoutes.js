// assign vars to required packages, models, and helpers
const router = require('express').Router();
const { Station, Price } = require('../../models');
const withAuth = require('../../utils/auth');

// get all stations
router.get('/', withAuth, async (req, res) => {
    try {
        // select all stations in database
        const stationData = await Station.findAll();

        if (stationData) {
            res.status(200).json(stationData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// new station route
router.post('/', withAuth, async (req, res) => {
    try {
        // find a station with inputted address
        const checkStation = await Station.findOne({
            where: {
                address: req.body.address,
            },
            raw: true,
        });

        // if inputted address already exists in database, update that station's price
        if (checkStation) {
            // update
            Price.update(
                { price: req.body.price },
                {
                    where: {
                        station_id: checkStation.id,
                    },
                }
            );
            res.status(200);
        } else if (checkStation === null) {
            // if the inputted address does not exist in database, add a new station
            const stationData = await Station.create({ name: req.body.name, address: req.body.address, zip: req.body.zip });
            res.status(200).send(stationData.dataValues);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
