const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require('mongoose');

const user = require('../models/User')
const ad = require('../models/Ad');

function makeid() {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

router.get('/',auth.isLoggedIn, function (req,res,next) {
    res.render('create_ad', {title: "Создать объявление"});
});

router.post('/', auth.isLoggedIn, async function (req, res, next) {
    let token = req.cookies.token;
    let token_data = jwt.decode(token, process.env.SECRET_KEY)
    let user_data = await user.findOne({login: token_data.login});
    req.files.photos.filename = makeid()+'.jpg';
    let data = {
        _id: new mongoose.Types.ObjectId(),
        login: user_data.login,
        title: req.body.title,
        photos: req.files.photos,
        description: req.body.description,
        number: user_data.number,
        name: user_data.name,
        date: Date.now(),
        u_id: user_data._id
    }
    let crate = await  ad.create(data);
    console.log(crate);
    let add_id = await user.updateOne({login: token_data.login}, {$push: { ad_ids: crate._id}});
    res.redirect('/ads');
});

module.exports = router;
