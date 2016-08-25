var express = require('express');
var router = express.Router();
var Converter = require("csvtojson").Converter;

/* GET home page. */
router.get('/', function(req, res, next) {
  var converter = new Converter({});
  converter.fromFile("C:\\Users\\Mathieu\\Documents\\Ecole\\PoolDrafting\\stats\\players_2015_2016.csv",function(err,result){
    var test = result;
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
