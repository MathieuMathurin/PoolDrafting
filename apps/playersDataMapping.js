var fs = require('fs'),
    _ = require('lodash')

function findPlayerPrediction(predictions, name) {
    var prediction = _.find(predictions, function (prediction) {
        return prediction.name === name;
    });
    return prediction;
}

function mapAllDataToPlayers(teams, players, predictions) {
    players = _.map(players, function (player) {
        
        var playerPrediction = findPlayerPrediction(predictions, player.Name);
        player.Prediction = playerPrediction;

        player.Team = _.find(teams, function(team){return team.TeamID === player.TeamID});

        const playerData = {
            name: player.Name,
            birtDate: player.BirthDate,
            status: player.Status,
            team: player.Team,
            position: player.Position,
            jersey: player.Jersey,
            height: player.Height,
            weight: player.Weight,
            birtDate: player.BirtDate,
            photoUrl: player.photoUrl,
            prediction: player.Prediction
        }

        return playerData;
    });
    fs.writeFile('../DB/players-2018-2019.json', JSON.stringify(players), 'utf8', function(err){
        if(err){
            console.log(err);
            process.exit(1);
        }
        console.log('Done');
        process.exit();
    });
}

var players = fs.readFileSync('../roster/activePlayers-2018-2019.json');
players = JSON.parse(players).map(function (player) { player.Name = player.FirstName + " " + player.LastName; return player; });

var predictions = fs.readFileSync('../predictions/2018-2019.json');
predictions = JSON.parse(predictions);

var teams = fs.readFileSync('../teams/2018-2019.json');
teams = JSON.parse(teams);

mapAllDataToPlayers(teams, players, predictions);