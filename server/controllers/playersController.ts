import { Router } from "express";
import { addFilter } from "./filterHelper";
import { mongoClient, collectionNames } from "../mongoClient";

export const router = Router();

interface Player {
    _id: string;
    name: string;
    position: string;
    photoUrl: string;
    salary: number;
    predictions: any[];
    team: any;
}

function parseQuery(query: any) {
    let parsedQuery = {};
    if (query.searchTerm) {
        parsedQuery = {$text: {$search: query.searchTerm.trim()}};
    }

    if(query.positions) {
        parsedQuery["position"] = query.positions instanceof Array ? {$in: query.positions} : {$in: [query.positions]};
    }

    if(query.team) {
        parsedQuery["team.Key"] = query.team;
    }

    return parsedQuery;
}

/* GET 100 players sorted by prediction points */
router.get('/players', async (req, res, next) => {
    const db = await mongoClient.getDb();
    const query = parseQuery(req.query);
    const players = await db.collection<Player>(collectionNames.players).find(query).limit(100).sort({"prediction.points": -1}).toArray();

    res.setHeader('Cache-Control', 'no-cache');
    return res.send(players);
});

/* GET players which name match and by filters */
router.get('/players/:searchTerm', function (req, res, next) {

    var formatedSearchTerm = req.params.searchTerm.split(" ").map(function (term) {
        return req.query.fuzzy ? term + "~*" : term + "*";
    })
        .join(" "); //Adds wildcard to each word and fuzzyness when specified

    var query = "q=IsSelected:false AND Name:" + formatedSearchTerm;

    query = addFilter(query, req.query);

    // request(baseUrl + query).then(function (data) {
    //     data = JSON.parse(data);
    //     if (data && data.hits && data.hits.hits) {
    //         res.jsonp(data.hits.hits);
    //     } else {
    //         res.jsonp([]);
    //     }
    // });
});

// TODO: Split draft and undraft command
router.put("/players/:id", function (req, res, next) {
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


    // var getPlayer = request(getPlayerOptions);
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

        // return request(addPlayerOptions);
    };
    var getNewPlayer = function(data){        
        var options = {
            method: 'GET',
            uri: baseUrl + data._id
        };

        // return request(options);
    }
    var sendNewPlayer = function(data){
        // return q.fcall(function(){
        //     res.send(data);
        // });
    }
    // var deleteInitialPlayer = request(deletePlayerOptions);

    // getPlayer
    //     .then(modifyAndAddPlayer)
    //     .then(getNewPlayer)
    //     .then(sendNewPlayer)
    //     .then(deleteInitialPlayer)
    //     .catch(function (err) {
    //         console.log(err);
    //     })


});