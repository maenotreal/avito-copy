const express =require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ad = require('../models/Ad');

router.get('/', auth.isLoggedIn, async function (req, res, next){
    let data = await ad.find({});
    res.send(data);
});

module.exports = router;