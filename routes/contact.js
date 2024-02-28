const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('contact');
});

router.get('/admin', (req, res) => {
  res.render('admin-login');
});

module.exports = router;