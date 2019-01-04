var Sermons = require('../models/sermons.js');

exports.getSermons = function(req, res){
    Sermons.find()
    .then(function(sermon){
        res.json(sermon);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createSermon = function(req, res){
  Sermons.create(req.body)
  .then(function(newSermon){
      res.status(201).json(newSermon);
  })
  .catch(function(err){
      res.send(err);
  });
};

exports.getSermon = function(req, res){
   Sermons.findById(req.params.sermonId)
   .then(function(foundSermon){
       res.json(foundSermon);
   })
   .catch(function(err){
       res.send(err);
   });
};

module.exports = exports;