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

var markov = _.find(players, function(p){return p.Name.indexOf("Markov") !== -1});
var bourque = _.find(players, function(p){return p.Name.indexOf("Rene Bourque") !== -1});
var bernier = _.find(players, function(p){return p.Name.indexOf("Jonathan Bernier") !== -1});
var beaulieu = _.find(players, function(p){return p.Name.indexOf("Nathan Beaulieu") !== -1});

var test = 1;
// var options = {
//     method: 'POST',
//     uri: 'http://localhost:9200/_bulk',
//     body : bulkTask
// };

// request(options).then(function(body){
//     console.log(body);
//     process.exit();
// });