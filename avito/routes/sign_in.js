const express = require('express');
const router = express.Router();

let User = require('../models/User');

router.get('/', function(req, res, next) {
    res.render('sign_in', {title: "Вход"})
});

router.post('/', async function(req, res, next) {
    let { login, password } = req.body;

    if (!login|| !password) {
        return res.status(400).json({
            error: 'login/password required',
        });
    }

    try {
        let user = await User.findOne({login: req.body.login});
        console.log(user);
        if (!user) {
            return res.status(400).json({
                error: 'user does not exist',
            });
        }
        console.log(req.cookies.token);
        if(req.cookies.token === undefined) {
            res.cookie('token', user.token, {
                maxAge: 604800000,
                secure: true,
                overwrite: true,
                path: '/'
            });

        }

        let result = user.checkPassword(req.body.password);

        if (result === false) {
            return res.status(400).json({
                error: 'incorrect password',
            });
        }




        return res.redirect('/');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
