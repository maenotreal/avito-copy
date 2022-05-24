const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
let Ad = require('../models/Ad');
let auth = require('../middleware/auth');
let User = require('../models/User');

router.post('/', auth.isLoggedIn, async function(req,res,next){
    let token_check = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    if (!token_check) {
        res.render('error/401')
    } else {
        let token_data = jwt.decode(req.cookies.token, process.env.SECRET_KEY)
        let check = await Ad.find({login: token_data.login});
        console.log(check);
        if (!check) {
            res.render('error/404');
        } else {
            await Ad.deleteOne({_id: req.query.id});
            await User.updateOne({login: token_data.login}, {$pull: {
                ad_ids: req.query.id
                }})
            res.redirect('/profile');
        }
    }
})

module.exports = router;