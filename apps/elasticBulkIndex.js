var fs = require('fs'),
    request = require('request-promise'),
    _ = require('lodash');

/*
JSON structure for bulk tasks
https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
*/

var players = fs.readFileSync('./DB/players.json');
players = JSON.parse(players);

var elasticIndexTask = '{ "index" : { "_index" : "players", "_type" : "player" } }\n'
var bulkTask = '';

players.forEach(function(player){
    bulkTask = bulkTask + elasticIndexTask + JSON.stringify(player) + '\n';
});

var options = {
    method: 'POST',
    uri: 'http://localhost:9200/_bulk',
    body : bulkTask
};

request(options).then(function(body){
    console.log(body);
    process.exit();
});