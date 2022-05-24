const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies.token === undefined) {
    res.render('index', {title: "Площадка для объявлений"});
  } else {
    res.redirect('/ads');
  }
});

module.exports = router;
