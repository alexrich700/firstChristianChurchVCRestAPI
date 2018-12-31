var express = require('express');
var router = express.Router();
var db = require("../models/events");
var helpers = require("../helpers/events");

router.route('/')
  .get(helpers.getEvents)
  .post(helpers.createEvent);
 
router.route('/:eventId')
  .get(helpers.getEvent)
  .put(helpers.updateEvent)
  .delete(helpers.deleteEvent);
  
module.exports = router;