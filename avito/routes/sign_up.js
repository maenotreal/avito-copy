const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let User = require('../models/User');

router.get('/', function(req, res, next) {
    res.render('sign_up', {title: "Регистрация"})
});

router.post('/', async function (req,res,next){
   let data = {
       _id: new mongoose.Types.ObjectId(),
       login: req.body.login,
       name: req.body.name,
       number: req.body.number,
       token: jwt.sign({
           login : req.body.login,
           name : req.body.name
       }, process.env.SECRET_KEY),
       password: req.body.password
   }

   try {
       let user = await User.findOne({login: data.login});

       if (user) {
           return res.status(400).json({error: 'user already exist'});
       }

       let createdUser = await User.create(data);

       res.cookie('token', data.token, {
           maxAge: 604800000,
           secure: true,
           httpOnly: true
       });

       return res.redirect('/');
   } catch (error) {
       next(error);
   }
});

module.exports = router;
