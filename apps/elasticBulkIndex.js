var fs = require('fs'),
    axios = require('axios'),
    _ = require('lodash');
    var querystring = require('querystring');

/*
JSON structure for bulk tasks
https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
*/

var players = fs.readFileSync('./DB/players.json');
players = JSON.parse(players);

var elasticIndexTask = '{ "index" : { "_index" : "players", "_type" : "player" } }\n'
var bulkTask = '';

players.forEach(function (player) {
    bulkTask = bulkTask + elasticIndexTask + JSON.stringify(player) + '\n';
});

axios({
    method: 'post',
    url:'http://localhost:9200/_bulk',
    headers: {
        'Content-Type': 'application/json'
    },
    data: bulkTask
})
.then(() => process.exit())
.catch(err => {
    console.error(err);
});