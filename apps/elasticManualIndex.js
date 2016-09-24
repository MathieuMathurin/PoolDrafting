var fs = require('fs'),
    _ = require('lodash'),
    readline = require('readline'),
    copyPaste = require('copy-paste');

var players = fs.readFileSync('./DB/players.json');
players = JSON.parse(players);

function ContinueOrExit() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Find another player?\nO/N:  ', function (input) {
        rl.close();
        if (input && input == 'O' || input == 'o') {
            findPlayer();
        } else if(input && input == 'N' || input == 'n'){
            process.exit();
        }else{
            ContinueOrExit();
        }
    });
}

function findPlayer() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Player Name: ', function (input) {
        var player = _.find(players, function (p) { return p.Name.indexOf(input) !== -1 });
        copyPaste.copy(JSON.stringify(player), function () {
            console.log("Player copied to clipboard");
            rl.close();
            ContinueOrExit();
        });
    });
}

findPlayer();