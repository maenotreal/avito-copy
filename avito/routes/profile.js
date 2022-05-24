const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
let User = require('../models/User');
let Ad = require('../models/Ad');
let auth = require('../middleware/auth');

router.get('/', auth.isLoggedIn, async function(req, res, next) {
    let token_data = jwt.decode(req.cookies.token, process.env.SECRET_KEY);
    let data = await User.find({login: token_data.login});
    let adData = await Ad.find({login: token_data.login});
    console.log(data);
    console.log(adData);
    res.render('profile', {title: "Профиль ", uData: data, aData: adData})
});


module.exports = router;