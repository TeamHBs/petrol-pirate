const router = require('express').Router();
const { Price, Station, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all prices and JOIN with user data
        const priceData = await Price.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // Serialize data so the template can read it
        const prices = priceData.map((price) => price.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            prices,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/price/:id', async (req, res) => {
    try {
        const priceData = await Price.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const price = priceData.get({ plain: true });

        res.render('price', {
            ...price,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Price }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
