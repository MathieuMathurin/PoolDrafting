import { Router } from "express";
import { IUserState } from "./IUserState";

import { mongoClient, collectionNames } from "../mongoClient";
import { PoolModel } from "../mongoModels";
import { Pool } from "../Pool";
import { ObjectId } from "bson";

export const router = Router();

router.get("/me/pool", async (req, res) => {
    const { poolId } = JSON.parse(req.cookies.userState) as IUserState;

    const db = await mongoClient.getDb();
    const poolData = await db.collection<PoolModel>(collectionNames.pools).findOne({_id: new ObjectId(poolId)});
    const pool = new Pool(poolData);

    const { draftingPooler, round } = pool;
    return res.send(JSON.stringify({ draftingPooler, round }))
});

router.get("/me/picks", async (req, res) => {
    const { poolId, userId } = JSON.parse(req.cookies.userState) as IUserState;

    const db = await mongoClient.getDb();
    const poolData = await db.collection<PoolModel>(collectionNames.pools).findOne({_id: new ObjectId(poolId)});
    const myPicks = poolData.picks.filter(pick => pick.poolerId.equals(new ObjectId(userId)));

    return res.send(JSON.stringify(myPicks));
})