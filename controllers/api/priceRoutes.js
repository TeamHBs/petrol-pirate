const router = require('express').Router();
const { Price } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/', async (req, res) => {
//     let whereClause = {};

//     if (req.query.zip) {
//         whereClause.zip = { zip: req.query.zip };
//     }

//     if (req.query.price) {
//         whereClause.price = {
//             price: {
//                 [Op.lte]: req.query.price,
//             },
//         };
//     }

//     const message = req.query.message || '';

//     try {
//         // Get all prices and JOIN with user data
//         const priceData = await Price.findAll({
//             where: whereClause.price,
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//                 {
//                     model: Station,
//                     attributes: ['name', 'address', 'zip'],
//                     where: whereClause.zip,
//                 },
//             ],
//         });

//         // Serialize data so the template can read it
//         const prices = priceData.map((price) => price.get({ plain: true }));

//         // Pass serialized data and session flag into template
//         if (!req.session.logged_in) {
//             res.redirect('/login');
//             return;
//         }

//         res.json(prices);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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
