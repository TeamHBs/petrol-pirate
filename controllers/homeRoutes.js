// assign vars to required packages, models, and helpers
const router = require('express').Router();
const { Price, Station, User } = require('../models');
const { Op } = require('sequelize');
const withAuth = require('../utils/auth');

// homepage
router.get('/', async (req, res) => {
    // initialize where rules
    let whereClause = {};
    // if a zip is passed as a query, add zip to where rules
    if (req.query.zip) {
        whereClause.zip = { zip: req.query.zip };
    }
    // if a max price is passed as a query, add price to where rules
    if (req.query.price) {
        whereClause.price = {
            price: {
                [Op.lte]: req.query.price,
            },
        };
    }
    // if a message is passed as as query, assign it
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
                    attributes: ['name', 'address', 'zip'],
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
        // send user to homepage
        res.render('homepage', {
            prices,
            logged_in: req.session.logged_in,
            message,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/submit', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (!req.session.logged_in) {
        res.redirect('/');
        return;
    }

    // send user to submission page
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
    //send user to login page
    res.render('login');
});

module.exports = router;
