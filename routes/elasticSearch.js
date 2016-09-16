var express = require('express'),
    router = express.Router(),
    request = require('request-promise'),
    _ = require('lodash'),
    baseUrl = "http://localhost:9200/players/player/_search?";

function addFilter(query, filters) {
    //Position filter
    if (filters.position) {
        query = query + " AND Position:" + filters.position;
    }

    //Team filter
    if (filters.teamID) {
        query = query + " AND TeamID:" + filters.teamID;
    }

    //Salary filter
    if (filters.salary) {
        var bounds = filters.salary.split("-");
        var min = bounds[0];
        var max = bounds[1];

        query = query + " AND Prediction.SAL: [" + min + " TO " + max + "]"; //[ ] is inclusive, { } is exclusive
    }

    //Points filter
    if (filters.points) {
        var bounds = filters.points.split("-");
        var min = bounds[0];
        var max = bounds[1];

        query = query + " AND Prediction.PTS: [" + min + " TO " + max + "]"; //[ ] is inclusive, { } is exclusive
    }

    return query;
}

/* GET 100 players sorted by prediction points */
router.get('/players', function (req, res, next) {
    var query = "q=IsSelected:false";

    query = addFilter(query, req.query);

    request(baseUrl + query + "&sort=Prediction.PTS:desc&size=100").then(function (data) {
        data = JSON.parse(data);
        if (data && data.hits && data.hits.hits) {
            res.jsonp(data.hits.hits);
        } else {
            res.jsonp([]);
        }
    });
});

/* GET players which name match and filter by position */
/* Other filter will be done in JS because of the types and I don't want to re-index everything' */
router.get('/players/:searchTerm', function (req, res, next) {

    var searchTerms = req.params.searchTerm.split(" ").map(function (term) {
        return req.query.fuzzy ? term + "~*" : term + "*";
    }); //Adds wildcard to each word and fuzzyness when specified

    var formatedSearchTerm = searchTerms.join(" ");
    var query = "q=IsSelected:false AND Name:" + formatedSearchTerm;

    query = addFilter(query, req.query);

    request(baseUrl + query).then(function (data) {
        data = JSON.parse(data);
        if (data && data.hits && data.hits.hits) {
            res.jsonp(data.hits.hits);
        } else {
            res.jsonp([]);
        }
    });
});

module.exports = router;