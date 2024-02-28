const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request for username:', username); 
    if (username === 'Ansar' && password === 'Qqwerty1!') {
        try {
            const user = await User.findOne({ username });
            console.log('User found in database:', user); 
            if (!user || !user.isAdmin) {
                console.log('Unauthorized: User not found or not an admin'); 
                return res.status(401).send('Unauthorized');
            }
            req.session.user = { username: user.username, isAdmin: user.isAdmin };
            res.redirect('/admin/adminpanel');
        } catch (error) {
            console.error('Error authenticating admin:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        console.log('Unauthorized: Invalid username or password');
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;
