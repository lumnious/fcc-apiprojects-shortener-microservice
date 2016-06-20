var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/shorturl';
var prj = {"_id": 0, "code": 1, "originalURL": 1};

var exports = module.exports = {};


exports.getShortLink = function (val, callback) {

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.collection('pairs').findOne({'code': val}, prj, function (err, doc) {
      db.close();
      if (doc) {
        console.log('Document found!');
        callback({"response": 0, "text": "Ok", "url": doc.originalURL})
      } else {
        console.log('Document not found!');
        callback({ "response": -1, "text": 'Short URL does not exist.' });
      }
    });
  });
};


exports.addLink = function (val, string, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    db.collection('pairs').count({}, function (err, count) {
      if(count === 0) {
        db.createCollection('pairs', {capped: true, size: 10000000, max: 1000}, function(err) {
          assert.equal(null, err);
          console.log('Capped collection created - ');

          db.collection('pairs').insertOne({"code": string, "originalURL": val}, function (err) {
            assert.equal(null, err);
            console.log('Inserted one record');
            db.close();
            callback({"original" : val, "shortened" : "https://lut-url.herokuapp.com/" + string});
          })
        })
      } else {
        db.collection('pairs').findOne({ "originalURL": val }, prj, function (err, doc) {
          if(doc) {
            db.close();
            callback({"original" : val, "shortened" : "https://lut-url.herokuapp.com/" + doc.code});
          } else {
            db.collection('pairs').insertOne({"code": string, "originalURL": val}, function (err) {
              assert.equal(null, err);
              console.log('Inserted one record');
              db.close();
              callback({"original" : val, "shortened" : "https://lut-url.herokuapp.com/" + string});
            })
          }
        });
      }
    });
  });
};