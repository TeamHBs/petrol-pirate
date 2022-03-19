const router = require('express').Router();
const { Station } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const stationData = await Station.findAll();
        if (stationData) {
            res.status(200).json(stationData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const stationData = await Station.create({ ...req.body });

        res.status(200).send(stationData.dataValues);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
