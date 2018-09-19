import { mongoClient, collectionNames } from "../server/mongoClient";
var request = require('request-promise');
var cheerio = require('cheerio');

const fetch = async () => {
    const db = await mongoClient.getDb();
    const players = await db.collection(collectionNames.players).find({}).limit(5).toArray();
    
    var options = {
        uri: `https://www.capfriendly.com/players/${players[0].name}`
    };
    const data = await request(options);
    const $ = cheerio.load(data)

    mongoClient.closeClient();
}

fetch()