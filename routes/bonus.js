const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

router.get('/', (req, res) => {
    Quiz.find({})
    .then(questions => {
        res.render('bonus', { questions });
    })
    .catch(error => {
        console.error('Error retrieving questions:', error);
        res.status(500).send('Internal Server Error');
    });
    })
    
router.get('/admin', (req, res) => {
     res.render('admin-login'); 
    });

module.exports = router;