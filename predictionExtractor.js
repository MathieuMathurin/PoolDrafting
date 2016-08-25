var cheerio = require('cheerio');

var page1 = require('./predictions/lePoolPage1.js');
var page2 = require('./predictions/lePoolPage2.js');
var page3 = require('./predictions/lePoolPage3.js');
var page4 = require('./predictions/lePoolPage4.js');
var page5 = require('./predictions/lePoolPage5.js');

var pages = [page1, page2, page3, page4, page5];

pages.forEach(function(page){
    var $ = cheerio.load(page);
    var test = $('tr')[0].text();
    var t = test;
});