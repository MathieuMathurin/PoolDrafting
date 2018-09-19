import { mongoClient, collectionNames } from "../server/mongoClient";
var request = require('request-promise');
var cheerio = require('cheerio');

interface Player {
    _id: string;
    name: string;
    position: string;
    photoUrl: string;
    salary: number;
    predictions: any[];
    team: any;
}

const fetch = async () => {
    const db = await mongoClient.getDb();
    const players = await db.collection<Player>(collectionNames.players).find({}).sort({name: 1}).skip(1000).limit(250).toArray();

    const promises = players.map(player => {
        var options = {
            uri: `https://www.capfriendly.com/players/${player.name.replace(" ", "-")}`
        };
        return request(options);
    });

    const data = await Promise.all(promises);

    data.forEach((d, index) => {
        const $ = cheerio.load(d)

        var match = $.html().match(/Cap Hit: \$[0-9]*,[0-9]*,[0-9]*/);
        var otherMatch = $.html().match(/Cap Hit: \$[0-9]*,[0-9]*/);
        console.log(`${players[index].name}: ${match && match[0] || otherMatch && otherMatch[0]}`);
    })

    mongoClient.closeClient();
    process.exit();
}

fetch()