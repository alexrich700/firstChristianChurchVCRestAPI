var Events = require('../models/events.js');

exports.getEvents = function(req, res){
    Events.find()
    .then(function(txt){
        res.json(txt);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.createEvent = function(req, res){
  Events.create(req.body)
  .then(function(newTxt){
      res.status(201).json(newTxt);
  })
  .catch(function(err){
      res.send(err);
  });
};

exports.getEvent = function(req, res){
   Events.findById(req.params.textId)
   .then(function(foundTxt){
       res.json(foundTxt);
   })
   .catch(function(err){
       res.send(err);
   });
};

exports.updateEvent =  function(req, res){
   Events.findOneAndUpdate({_id: req.params.textId}, req.body, {new: true})
   .then(function(txt){
       res.json(txt);
   })
   .catch(function(err){
       res.send(err);
   });
};

exports.deleteEvent = function(req, res){
   Events.remove({_id: req.params.eventId}) 
   .then(function(){
       res.json({message: 'I deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   });
};

module.exports = exports;