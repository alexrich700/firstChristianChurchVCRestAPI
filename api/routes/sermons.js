var express = require('express');
var router = express.Router();
var helpers = require("../helpers/sermons");

router.route('/')
  .get(helpers.getSermons)
  .post(helpers.createSermon);

router.route('/:sermonId')
  .get(helpers.getSermon);
  
module.exports = router;