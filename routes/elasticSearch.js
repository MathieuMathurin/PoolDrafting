var express = require('express'),
    router = express.Router(),
    request = require('request-promise'),
    _ = require('lodash'),
    q = require('q'),
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

    return query + "&sort=Prediction.PTS:desc";
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

/* GET players which name match and by filters */
router.get('/players/:searchTerm', function (req, res, next) {

    var formatedSearchTerm = req.params.searchTerm.split(" ").map(function (term) {
        return req.query.fuzzy ? term + "~*" : term + "*";
    })
        .join(" "); //Adds wildcard to each word and fuzzyness when specified

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

router.post("/player/update", function (req, res, next) {
    var baseUrl = "http://localhost:9200/players/player/";
    var url = baseUrl + req.body.player_id;

    var getPlayerOptions = {
        method: 'GET',
        uri: url
    };

    var deletePlayerOptions = {
        method: 'DELETE',
        uri: url
    };


    var getPlayer = request(getPlayerOptions);
    var modifyAndAddPlayer = function (data) {
        data = JSON.parse(data);

        var player = data._source;
        player.IsSelected = req.body.isSelected;

        var addPlayerOptions = {
            method: 'POST',
            uri: url,
            body: player,
            json: true
        };

        return request(addPlayerOptions);
    };
    var getNewPlayer = function(data){        
        var options = {
            method: 'GET',
            uri: baseUrl + data._id
        };

        return request(options);
    }
    var sendNewPlayer = function(data){
        return q.fcall(function(){
            res.send(data);
        });
    }
    var deleteInitialPlayer = request(deletePlayerOptions);

    getPlayer
        .then(modifyAndAddPlayer)
        .then(getNewPlayer)
        .then(sendNewPlayer)
        .then(deleteInitialPlayer)
        .catch(function (err) {
            console.log(err);
        })


});

module.exports = router;