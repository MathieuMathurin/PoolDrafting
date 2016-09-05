var fs = require('fs'),
    _ = require('lodash'),
    Converter = require('csvtojson').Converter;

function findPlayerPrediction(predictions, name) {
    var prediction = _.find(predictions, function (prediction) {
        return prediction.Joueurs === name;
    });
    return prediction;
}

function getPlayerStats(stats, keys, name){
    var playerStats = {};
    keys.forEach(function(key){
        var currentStats = stats[key];
        var currentPlayerStat = _.find(currentStats, function(player){
            var playerName = player["First Name"] + " " + player["Last Name"]; 
            return playerName === name;
        });
        var keyFragment = key.split('_');
        var season = keyFragment[1] + "-" + keyFragment[2];
        playerStats[season] = currentPlayerStat;
    });
    return playerStats;
}

function mapAllDataToPlayers(teams, players, predictions, stats) {
    players = _.map(players, function (player) {
        
        var playerPrediction = findPlayerPrediction(player.Name);
        player.Prediction = playerPrediction;

        var keys = _.keys(stats);
        if(player.Position === "G"){
            var goalieKeys = keys.filter(function(key){return key.indexOf("goalies") !== -1});
            player.Stats = getPlayerStats(stats, goalieKeys, player.Name);
        }else{
            var playerKeys = keys.filter(function(key){return key.indexOf("players") !== -1});
            player.Stats = getPlayerStats(stats, playerKeys, player.Name);
        }

        player.Team = _.find(teams, function(team){return team.TeamID === player.TeamID});      

        return player;
    });
    fs.writeFile('./DB/players.json', JSON.stringify(players), 'utf8', function(err){
        if(err) console.log(err);
        console.log('Done');
    });
}

var players = fs.readFileSync('./roster/activePlayers.json');
players = JSON.parse(players).map(function (player) { player.Name = player.FirstName + " " + player.LastName; return player; });

var predictions = fs.readFileSync('./predictions/2016-2017.json');
predictions = JSON.parse(predictions);

var teams = fs.readFileSync('./teams/2016-2017.json');
teams = JSON.parse(teams);

var stats = {};
var statsFiles = ['goalies_2013_2014', 'goalies_2014_2015', 'goalies_2015_2016', 'players_2013_2014', 'players_2014_2015', 'players_2015_2016'];
statsFiles.forEach(function (file) {
    var converter = new Converter({});
    converter.fromFile('./stats/' + file + '.csv', function (err, result) {
        stats[file] = result;
        var allFilesConverted = _.keys(stats).length === statsFiles.length;
        if (allFilesConverted) {
            mapAllDataToPlayers(teams, players, predictions, stats);
        }
    });
});