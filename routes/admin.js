const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Weather = require('../models/weather');

function isAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.isAdmin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
}

router.get('/adminpanel', isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        const weatherData = await Weather.find(); 
        res.render('adminpanel', { users, weatherData }); 
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/adduser', async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await User.create({
            username,
            password,
            isAdmin: false
        });

        res.redirect('/admin/adminpanel');
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/edituser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { username, password } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { username, password }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/deleteuser/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;




