var cheerio = require('cheerio'),
    fs = require('fs');

var page1 = '../predictions/lePool-2018-2019-recrues-page-1.html';
var page2 = '../predictions/lePool-2018-2019-recrues-page-2.html';
var page3 = '../predictions/lePool-2018-2019-recrues-page-3.html';
var page4 = '../predictions/lePool-2018-2019-recrues-page-4.html';

var pages = [page1, page2, page3, page4 ];

//puts 5 arrays in a file (not valid JSON)
var playersPrediction = [];
pages.forEach(function (htmlPage) {
    var players = [];
    var page = fs.readFileSync(htmlPage);
    page = page.toString();
    page = page.replace(/\r*\n*/g, '');
    var $ = cheerio.load(page);
    var properties = $('th')
        .text()
        .trim()
        .split(" ")
        .filter(function (word) { return word != "" });
    var rows = $('tr').slice(1).each(function (row) {
        var $$ = cheerio.load(row);
        if ($$(this).find('td').attr('colspan')) {
            //Unable to do the negation with cheerio so noOp here instead
        } else {
            var stats = $$(this).text().trim().split(" ").filter(function (word) { return word != "" });

            const [ 
                order, 
                position, 
                firstName, 
                lastName,
                gamePlayed,
                goals,
                passes,
                points, 
                pointPerMatch, 
                plusMinus,
                punition,
                powerPlayGoals,
                penaltyKillerGoals,
                winningGoals,
                overtimeGoals,
                shootoutGoals,
                age,
                height,
                weight,
                salary,
                predictions
            ] = stats;
            if(predictions) {
                return;
            }

            const team = $$(this).find("img").attr("alt")
            const player = {
                team,
                name: `${firstName} ${lastName}`,
                position,
                gamePlayed,
                age,
                height,
                weight
            };
            players.push(player);
        }
    });

    playersPrediction = playersPrediction.concat(players);
});

writeToFile(JSON.stringify(playersPrediction));

function writeToFile(data) {
    fs.appendFile('../predictions/rookies-2018-2019.json', data, function (err) {
        if (err){
             console.log(err);
             process.exit(1);
        }
        console.log('done');
        process.exit();
    });
}