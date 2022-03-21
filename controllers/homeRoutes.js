const router = require('express').Router();
const { Price, Station, User } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    let whereClause = {};

    if (req.query.zip) {
        whereClause.zip = { zip: req.query.zip };
    }

    if (req.query.price) {
        whereClause.price = {
            price: {
                [Op.lte]: req.query.price,
            },
        };
    }

    const message = req.query.message || '';

    try {
        // Get all prices and JOIN with user data
        const priceData = await Price.findAll({
            where: whereClause.price,
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Station,
                    attributes: ['name', 'zip'],
                    where: whereClause.zip,
                },
            ],
        });

        // Serialize data so the template can read it
        const prices = priceData.map((price) => price.get({ plain: true }));

        // Pass serialized data and session flag into template
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        res.render('homepage', {
            prices,
            logged_in: req.session.logged_in,
            message,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// price history route
// router.get('/price/:id', async (req, res) => {
//     try {
//         const priceData = await Price.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['name'],
//                 },
//             ],
//         });

//         const price = priceData.get({ plain: true });

//         res.render('price', {
//             ...price,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         // Find the logged in user based on the session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Price }],
//         });

//         const user = userData.get({ plain: true });

//         res.render('profile', {
//             ...user,
//             logged_in: true,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/submit', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('submit', {
        logged_in: req.session.logged_in,
    });
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
