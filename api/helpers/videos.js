var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost/text-api',
    ObjectId = require('mongodb').ObjectId,
    multer = require('multer'),
    fs = require('fs');
    
    
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


exports.getVideos = function(req, res){
    MongoClient.connect(url, function(err, db){
        db.collection('videos')
        .find({}).toArray(function(err, results){
        res.json(results);
        });
    });
};

exports.getVideo = function(req, res){
    var filename = req.params.videoId;
    MongoClient.connect(url, function(err, db){
        db.collection('videos')
            .findOne({'_id': ObjectId(filename)}, function(err, results){
                res.setHeader('content-type', 'video/mp4');
                fs.createReadStream(results.vidPath).pipe(res);
        });
    });
};


exports.updateVideo =  function(req, res){
    MongoClient.connect(url, function(err, db){
        db.collection('videos')
        .findOneAndUpdate({_id: req.params.videoID}, req.body, {new: true}, (err, vid) => {
            if(err){
                console.log(err);
            } else {
                res.json(vid);
            }
        });
    });
};

exports.deleteVideo = function(req, res){
    
};

module.exports = exports;