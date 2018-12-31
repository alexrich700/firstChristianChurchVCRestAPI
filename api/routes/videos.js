var express = require('express');
var router = express.Router();
var helpers = require("../helpers/videos");
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var url = 'mongodb://localhost/text-api';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/vid');
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    }
});
var maxSize = 1000000*900 ;
var upload = multer({
    storage: storage,
    fieldSize: maxSize
});

router.route('/')
  .get(helpers.getVideos);

// Added title insertion
router.post('/', upload.single('videoFile'), function(req, res){
  MongoClient.connect(url, (err, db) => {
        assert.equal(null, err);
        insertDocuments(db, 'public/vid/' + req.file.filename, req.body.title, () => {
            db.close();
            res.json({'message': 'File uploaded successfully'});
        });
    });
});

// inserts vidPath into DB is called in above function
var insertDocuments = function(db, filePath, title, callback) {
    var collection = db.collection('videos');
    collection.insertOne({'title': title, 'vidPath' : filePath}, (err, result) => {
        assert.equal(err, null);
        callback(result);
    });
};
 
router.route('/:videoId')
  .get(helpers.getVideo);
  // .put(helpers.updateVideo);
//   .delete(helpers.deleteText);

module.exports = router;