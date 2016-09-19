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

router.get("/user/create/:name", function (req, res, next) {
    var data = { name: req.params.name, players: [] };
    var option = {
        method: 'POST',
        uri: "http://localhost:9200/poolers/user",
        body: data,
        json: true
    }
    request.post(option).then(function (data) {
        var userModel = {
            id: data._id,
            user: {
                name: req.params.name,
                players: []
            }
        }
        res.jsonp(userModel);
    }).catch(function (err) {
        console.log(err);
    });
});

router.post("/user/update", function (req, res, next) {

    // var userData = {
    //     name: req.body.name,
    //     players: req.body.players        
    // };

    // var deleteUserOptions = {
    //     method: 'DELETE',
    //     uri: "http://localhost:9200/poolers/user/" + req.body.id,
    // }        

    // var addUserOptions = {
        
    //     method: 'POST',
    //     uri: "http://localhost:9200/poolers/user/" + req.body.id,
    //     body: userData,
    //     json: true
    // }

    var deletePlayerOptions = {
        method: 'DELETE',
        uri: "http://localhost:9200/players/player/" + req.body.player_id,
    }

    var addPlayerOptions = {
        
        method: 'POST',
        uri: "http://localhost:9200/players/player/" + req.body.player_id,
        body: req.body.player,
        json: true
    }

    // var deleteUser = request(deleteUserOptions);
    // var addUser = request(addUserOptions);
    var deletePlayer = request(deletePlayerOptions);
    var addPlayer = request(addPlayerOptions);

    deletePlayer
    .then(addPlayer)
    .then(function(data){
        res.send("ok");
    }).catch(function (err) {
        console.log(err);
    })


});

module.exports = router;