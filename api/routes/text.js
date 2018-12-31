var express = require('express');
var router = express.Router();
var db = require("../models/text");
var helpers = require("../helpers/text");

router.route('/')
  .get(helpers.getTexts)
  .post(helpers.createText);
 
router.route('/:textId')
  .get(helpers.getText)
  .put(helpers.updateText)
  .delete(helpers.deleteText);
  
module.exports = router;