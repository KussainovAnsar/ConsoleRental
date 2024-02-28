const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { username,surname, password, phone } = req.body;

    const errors = [];

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
        errors.push('Phone number is already in use');
    }

    if (errors.length > 0) {
        return res.render('register', { errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({
            username,
            surname,
            phone,
            password: hashedPassword,
        });

        await newUser.save();

        res.redirect('/login');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/admin', (req, res) => {
    res.render('admin-login');
});

module.exports = router;


