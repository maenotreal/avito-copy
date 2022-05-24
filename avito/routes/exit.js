const express = require('express');
const router = express.Router();

router.get('/', function (req,res,next) {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = router;