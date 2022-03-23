const router = require('express').Router();
const { Station, Price } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const stationData = await Station.findAll();

        if (stationData) {
            res.status(200).json(stationData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const checkStation = await Station.findOne({
            where: {
                address: req.body.address,
            },
            raw: true,
        });

        console.log(checkStation);

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
            const stationData = await Station.create({ name: req.body.name, address: req.body.address, zip: req.body.zip });
            res.status(200).send(stationData.dataValues);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
