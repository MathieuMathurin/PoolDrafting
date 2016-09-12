var express = require('express');
var router = express.Router();
var elasticsearch = require('elasticsearch');

/* GET all players ordered By Pts */
router.get('/players', function(req, res, next) {
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    client.search({
        index: 'players',
        type: 'player',
        from: 0,
        size: 50,        
        body: {
            query: {
                _all: ''
            }
        }
    });
});

module.exports = router;