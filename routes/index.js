var express = require('express');
var router = express.Router();

//var MongoClient = require('mongodb').MongoClient;
//var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/shorturl';

var format = require('../public/javascripts/format.js');
var randomString = require('../public/javascripts/randomString.js');
var db = require('../public/javascripts/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'URL Shortener Microservice' });
});

router.get('/:val*', function(req, res, next) {
    var test = format(req.params.val + req.params[0]);

    if (test === 0) {
    	db.getShortLink(req.params.val, function(val) {
    		if(val.response === 0) {
    			res.redirect(val.url);
    		} else {
    			res.send(val);
    		}
    	})
    } else if (test === 1) {
        res.send({ "response": -2, "text": 'The provided parameter doesn\'t seem a valid URL.' });
    } else {
    	var value = randomString(6);
    	db.addLink(test, value, function(val) {
    		res.send(val);
    	})
    }
});

module.exports = router;
