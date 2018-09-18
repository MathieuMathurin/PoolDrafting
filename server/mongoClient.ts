import { MongoClient, Db } from "mongodb";

// Connection URL
const url = "mongodb+srv://web-app-user:Qwerty1!@pooldraft-tikxc.mongodb.net/test?retryWrites=true";

// Database Name
const dbName = "pool2018-2019";

export const collectionNames = {
    users: "users",
    players: "players"
};

let _client: MongoClient = null;
let _db: Db = null;
// Use connect method to connect to the server
MongoClient.connect(url, (err, client) => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }

    console.log("Connected successfully to server");

    client = client;
    const db = client.db(dbName);
});

const getDb = async () => {
    try {
        if (!_db) {
            _client = await MongoClient.connect(url);
            _db = _client.db(dbName);
        }

        return Promise.resolve(_db);
    }
    catch (e) {
        console.error(e);
        process.exit(-1);
    }
}

const closeClient = () => {
    if (_client) {
        _client.close();
    }
}

export const mongoClient = {
    getDb,
    closeClient
};