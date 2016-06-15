var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/shorturl';

var exports = module.exports = {};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  if (db.pairs.count()) {
  	db.createCollection('pairs', {
  		capped : true,
  		max : 1000
  	})
  	console.log('Capped collection created');
  }

  db.close();

});
