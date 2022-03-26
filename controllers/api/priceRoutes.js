// assign vars to required packages, models, and helpers
const router = require('express').Router();
const { Price } = require('../../models');
const withAuth = require('../../utils/auth');

// new price route
router.post('/', withAuth, async (req, res) => {
    try {
        // create new price in database
        const newPrice = await Price.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPrice);
    } catch (err) {
        res.status(400).json(err);
    }
});

// remove price route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // remove price from database
        const priceData = await Price.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // if specified price does not exist, notify user
        if (!priceData) {
            res.status(404).json({ message: 'No price found with this id!' });
            return;
        }

        res.status(200).json(priceData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
