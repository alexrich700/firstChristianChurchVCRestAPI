var Sermon = require('../models/text.js');

exports.getTexts = function(req, res){
    Sermon.find()
    .then(function(txt){
        res.json(txt);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createText = function(req, res){
 Sermon.create(req.body)
  .then(function(newTxt){
      res.status(201).json(newTxt);
  })
  .catch(function(err){
      res.send(err);
  });
};

exports.getText = function(req, res){
  Sermon.findById(req.params.textId)
   .then(function(foundTxt){
       res.json(foundTxt);
   })
   .catch(function(err){
       res.send(err);
   });
};

exports.updateText =  function(req, res){
   Sermon.findOneAndUpdate({_id: req.params.textId}, req.body, {new: true})
   .then(function(txt){
       res.json(txt);
   })
   .catch(function(err){
       res.send(err);
   });
};

exports.deleteText = function(req, res){
   Sermon.remove({_id: req.params.textId}) 
   .then(function(){
       res.json({message: 'I deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   });
};

module.exports = exports;