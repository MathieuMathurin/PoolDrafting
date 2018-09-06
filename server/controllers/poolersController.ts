import { Router } from "express";
import { mongoClient, collectionNames } from "../mongoClient";
import { ObjectId } from "../node_modules/@types/bson";
import * as bcrypt from "bcrypt";

export const router = Router();
const saltRounds = 10;

interface UserModel {
    _id: ObjectId;
    userName: string;
    password: string;
}

router.post("/poolers", async (req, res) => {
    const data = req.body.user;

    if(!data || !data.userName || !data.password) {
        return res.sendStatus(400);
    }

    const db = await mongoClient.getDb();
    const user = await db.collection<UserModel>(collectionNames.users).findOne({userName: data.userName});
    
    if(!user) {
        const userData = {
            userName: data.userName,
            password: await bcrypt.hash(data.password, saltRounds)
        };
        const result = await db.collection<UserModel>(collectionNames.users).insertOne(userData);
        return res.set({Location: result.insertedId.toHexString()}).sendStatus(201);
    }

    if(await bcrypt.compare(data.password, user.password)) {
        return res.sendStatus(200);
    }

    return res.sendStatus(400);
});