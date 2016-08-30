var fs = require('fs');

fs.readFile('./roster/activePlayers.json', function(err, data){
    if(err) return;

    var roster = JSON.parse(data).map(function(player){ player.Name = player.FirstName + " " + player.LastName; return player; });
    mapPlayers(roster);        
});

function mapPlayers(roster){
    fs.readFile('./predictions/2016-2017.json', function(err, players){
        JSON.parse(players).forEach(function(player){
            findMatchingRoster(player, roster);
        });
    });
}

function findMatchingRoster(player, players){
    var result = players.filter(function(x){
        return x.Name == player.Joueurs
    })[0];
    return result;
}