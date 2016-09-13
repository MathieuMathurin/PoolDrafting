var express = require('express'),
    router = express.Router(),
    elasticsearch = require('elasticsearch'),
    _ = require('lodash');


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

/* GET all players */
router.get('/players', function (req, res, next) {
    client.search({
        index: 'players',
        type: 'player'
    }).then(function (data) {
        if (data && data.hits && data.hits.hits) {
            res.send(data.hits.hits);
        } else {
            res.send([]);
        }
    });
});

/* GET players which name match and filter by position */
/* Other filter will be done in JS because of the types and I don't want to re-index everything' */
router.get('/players/:searchTerm', function (req, res, next) {

    var query = {
        match: {
            Name: req.params && req.params.searchTerm
        }
    };
    var queryStringKeys = _.keys(req.query);
    if (queryStringKeys.length > 0 && queryStringKeys.Position || queryStringKeys.position) {        
        query = {
            filtered: {
                query: query,
                filter: {
                    term: {"Position" : value}
                }
            }
        };
    }

    client.search({
        index: 'players',
        type: 'player',
        body: {
            query: query
        }
    }).then(function (data) {
        if (data && data.hits && data.hits.hits) {
            res.send(data.hits.hits);
        } else {
            res.send([]);
        }
    });
});

module.exports = router;