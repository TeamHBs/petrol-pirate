// assign vars to required packages, models, and helpers
const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/login', async (req, res) => {
    try {
        const userData = await User.findAll();
        if (userData) {
            res.status(200).json(userData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

// new user route
router.post('/', async (req, res) => {
    try {
        // create new user in database
        const userData = await User.create(req.body);
        // create session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// handles user logging in
router.post('/login', async (req, res) => {
    try {
        // find user in database with inputted email
        const userData = await User.findOne({ where: { email: req.body.email } });

        // if inputted user is incorrect, notify user
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // checks if password is valid
        const validPassword = await userData.checkPassword(req.body.password);

        // if inputted password is incorrect, notify user
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        // create session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// route to handle user logging out
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // if user is logged in, destroy session
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
