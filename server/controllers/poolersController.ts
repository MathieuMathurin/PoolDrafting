import { Router } from "express";
import { mongoClient, collectionNames } from "../mongoClient";
import { ObjectId } from "../node_modules/@types/bson";
import * as bcrypt from "bcrypt";
import * as moment from "moment";

export const router = Router();
const saltRounds = 10;

interface UserModel {
    _id: ObjectId;
    userName: string;
    password: string;
}

router.post("/poolers/signup", async (req, res) => {
    const data = req.body.user;

    if (!data || !data.userName || !data.password) {
        return res.sendStatus(400);
    }

    const db = await mongoClient.getDb();
    const user = await db.collection<UserModel>(collectionNames.users).findOne({ userName: data.userName });

    if (!user) {
        const userData = {
            userName: data.userName,
            password: await bcrypt.hash(data.password, saltRounds)
        };
        const result = await db.collection<UserModel>(collectionNames.users).insertOne(userData);

        const userId = result.insertedId.toHexString();

        res.set({ Location: userId });
        res.cookie("userState", JSON.stringify({ userId, teamName: data.userName }));
        res.cookie("authToken", userId, { maxAge: moment.duration(1, "day").asMilliseconds() });

        return res.sendStatus(201);
    }

    return res.sendStatus(401);
});

router.post("/poolers/login", async (req, res) => {
    const data = req.body.user;

    if (!data || !data.userName || !data.password) {
        return res.sendStatus(400);
    }

    const db = await mongoClient.getDb();
    const user = await db.collection<UserModel>(collectionNames.users).findOne({ userName: data.userName });

    if (user && await bcrypt.compare(data.password, user.password)) {
        res.cookie("userState", JSON.stringify({ userId: user._id, teamName: user.userName }));
        res.cookie("authToken", user._id, { maxAge: moment.duration(1, "day").asMilliseconds() });

        return res.sendStatus(200);
    }

    return res.sendStatus(401);
});