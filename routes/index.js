var express = require('express');
var router = express.Router();

var format = require('../public/javascripts/format.js');
//var db = require('../public/javascripts/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'URL Shortener Microservice' });
});

router.get('/:val', function(req, res, next) {
	var test = format(req.params.val).toString();
	console.log(test);
  res.send(test);
});

module.exports = router;
