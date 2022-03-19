const router = require('express').Router();
const { Price } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        // final station where name - req.name

        const newPrice = await Price.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPrice);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const priceData = await Price.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

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
