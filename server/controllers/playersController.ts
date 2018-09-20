import { Router } from "express";
import { ObjectId } from "bson";

import { mongoClient, collectionNames } from "../mongoClient";
import { Player, PoolModel, DraftEvent } from "../mongoModels";
import { IUserState } from "./IUserState";
import { Pool } from "../Pool";

export const router = Router();

function parseQuery(query: any, selectedPlayers: ObjectId[]) {
    let parsedQuery = {
        _id: { $nin: selectedPlayers }
    };

    if (query.searchTerm) {
        parsedQuery["$text"] = { $search: query.searchTerm.trim() };
    }

    if (query.positions) {
        parsedQuery["position"] = query.positions instanceof Array ? { $in: query.positions } : { $in: [query.positions] };
    }

    switch(true) {
        case !!query.min && !!query.max:
            parsedQuery["$and"] = [{"salary": {$gte: query.min * 1}}, {"salary": {$lte: query.max * 1}}];
        break;
        case query.min && !query.max:
            parsedQuery["salary"] = {$gte: query.min * 1};
        break;
        case !query.min && query.max:
            parsedQuery["salary"] = {$lte: query.min * 1};
        break;
        default:
    }

    if (query.team) {
        parsedQuery["team.Key"] = query.team;
    }

    return parsedQuery;
}

/* GET 100 players sorted by prediction points */
router.get('/players', async (req, res) => {
    const { poolId } = JSON.parse(req.cookies.userState) as IUserState;

    const db = await mongoClient.getDb();
    const pool = await db.collection<PoolModel>(collectionNames.pools).findOne({ _id: new ObjectId(poolId) });
    const selectedPlayers = pool.picks.map(pick => pick.player._id);

    res.setHeader('Cache-Control', 'no-cache');
    const query = parseQuery(req.query, selectedPlayers);
    const players = await db.collection<Player>(collectionNames.players).find(query).limit(50).sort({ "prediction.points": -1 }).toArray();

    return res.send(players);
});

router.post('/players/:id', async (req, res) => {
    const userstate = JSON.parse(req.cookies.userState) as IUserState;
    const poolId = new ObjectId(userstate.poolId)
    const poolerId = new ObjectId(userstate.userId);
    const playerId = new ObjectId(req.params.id);

    const db = await mongoClient.getDb();
    const poolData = await db.collection<PoolModel>(collectionNames.pools).findOne({ _id: poolId });
    const pool = new Pool(poolData);

    if(!pool.isPlayerAvailable(playerId) || !pool.isPoolerAllowedToDraft(poolerId)) {
        return res.sendStatus(400);
    }

    const player = await db.collection<Player>(collectionNames.players).findOne({_id: playerId});

    const draftEvent: DraftEvent = { player: player, poolerId: poolerId, round: pool.round, poolerName: userstate.teamName };
    await db.collection<PoolModel>(collectionNames.pools).updateOne({ _id: poolId }, { $push: { picks: draftEvent} });

    res.setHeader('Cache-Control', 'no-cache');
    return res.sendStatus(200);
});