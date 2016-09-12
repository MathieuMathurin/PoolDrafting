var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/* GET all players */
router.get('/players', function(req, res, next) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    client.search({
        index: 'players',
        type: 'player'        
    }).then(function(data){
        res.send(data);
    });
});

module.exports = router;