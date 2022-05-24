const express = require('express');
const router = express.Router();
let Ad = require('../models/Ad');
let auth = require('../middleware/auth');

router.post('/', auth.isLoggedIn, async function(req,res,next){
    let id = req.query.id;
    let check = await Ad.findOne({_id: id});

    if (!check) {
        res.sendStatus(401).render('error/401');
    } else {
        //check.deleteOne({_id: id});
        res.sendStatus(200).redirect('/');
    }
})

module.exports = router;