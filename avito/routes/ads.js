const express = require('express');
const router = express.Router();
const Ad = require('../models/Ad');
let auth = require('../middleware/auth')
/* GET home page. */
router.get('/', auth.isLoggedIn, async function(req, res, next) {
    let ad = await Ad.find({});
    res.render('ads', {title: 'Объявления', cards: ad});
});

module.exports = router;
//