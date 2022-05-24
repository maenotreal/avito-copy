const express = require('express');
const router = express.Router();

let auth = require('../middleware/auth');
let Ad = require('../models/Ad');

router.get('/', auth.isLoggedIn, async function(req, res, next){
    let data = await Ad.find({_id: req.query.id});
    console.log(data);
    res.render('ad_page', {title: data.title, adData: data});
})

module.exports = router;