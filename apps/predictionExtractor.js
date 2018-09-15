var cheerio = require('cheerio'),
    fs = require('fs');

var page1 = '../predictions/lePool-2018-2019-page-1.html';
var page2 = '../predictions/lePool-2018-2019-page-2.html';
var page3 = '../predictions/lePool-2018-2019-page-3.html';
var page4 = '../predictions/lePool-2018-2019-page-4.html';
var page5 = '../predictions/lePool-2018-2019-page-5.html';

var pages = [page1, page2, page3, page4, page5];

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
            if (stats[1] == "G") {
                const [ 
                    order, 
                    position, 
                    firstName, 
                    lastName, 
                    lastYearGP, 
                    gamePlayed,
                    goals,
                    passes,
                    lastYeatVictories, 
                    victories,
                    lastYearDefeats,
                    defeats, 
                    lastYearOTDefeats,
                    overtimeDefeats,
                    lastYearBlanks,
                    blanks, 
                    lastYearPoints,
                    points, 
                    pointPerMatch, 
                    age, 
                    height, 
                    weight, 
                    salary
                ] = stats;
                const team = $$(this).find("img").attr("alt")
                const player = {
                    name: `${firstName} ${lastName}`,
                    gamePlayed: gamePlayed * 1,
                    victories: victories * 1,
                    defeats: defeats * 1,
                    overtimeDefeats: overtimeDefeats * 1,
                    blanks: blanks * 1,
                    points: points * 1,
                    pointPerMatch: pointPerMatch * 1
                };
                players.push(player);
            } else {
                const [ 
                    order, 
                    position, 
                    firstName, 
                    lastName, 
                    lastYearGP, 
                    gamePlayed, 
                    lastYearGoals, 
                    goals, 
                    lastYearPasses, 
                    passes, 
                    victories, 
                    defeats, 
                    overtimeDefeats,
                    blanks, 
                    lastYearPoints,
                    points, 
                    pointPerMatch, 
                    age, 
                    height, 
                    weight, 
                    salary
                ] = stats;
                const team = $$(this).find("img").attr("alt")
                const player = {
                    name: `${firstName} ${lastName}`,
                    gamePlayed: gamePlayed * 1,
                    goals: goals * 1,
                    passes: passes * 1,
                    points: points * 1,
                    pointPerMatch: pointPerMatch * 1
                };
                players.push(player);
            }
        }
    });

    playersPrediction = playersPrediction.concat(players);
});

writeToFile(JSON.stringify(playersPrediction));

function writeToFile(data) {
    fs.appendFile('../predictions/2018-2019.json', data, function (err) {
        if (err){
             console.log(err);
             process.exit(1);
        }
        console.log('done');
        process.exit();
    });
}