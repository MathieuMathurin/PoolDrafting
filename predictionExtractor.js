var cheerio = require('cheerio'),
    fs = require('fs');

var page1 = './predictions/lePoolPage1.html';
var page2 = './predictions/lePoolPage2.html';
var page3 = './predictions/lePoolPage3.html';
var page4 = './predictions/lePoolPage4.html';
var page5 = './predictions/lePoolPage5.html';

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
                stats[0] = null;
                stats[1] = null;
                stats[2] = stats[2] + " " + stats[3];
                stats[3] = null;
                stats[4] = null;
                stats[8] = null;
                stats[10] = null;
                stats[12] = null;
                stats[14] = null;
                stats[16] = null;
                stats[17] = '.';
            } else {
                stats[0] = null;
                stats[1] = null;
                stats[2] = stats[2] + " " + stats[3];
                stats[3] = null;
                stats[4] = null;
                stats[6] = null;
                stats[8] = null;
                stats[14] = null;
            }
            //Removes the null columns
            stats = stats.filter(function (property) { return property });

            var player = {};
            for (var i = 0; i < properties.length; ++i) {
                player[properties[i]] = stats[i];
            }

            var predictionElement = $$(this).next().find('td');
            if (predictionElement && predictionElement.attr('colspan') == '16') {
                player.Summary = predictionElement.text().trim();
            }

            players.push(player);
        }
    });

    playersPrediction = playersPrediction.concat(players);
});

writeToFile(JSON.stringify(playersPrediction));

function writeToFile(data) {
    fs.appendFile('./predictions/2016-2017.json', data, function (err) {
        if (err) console.log(err);
        console.log('done');
    });
}