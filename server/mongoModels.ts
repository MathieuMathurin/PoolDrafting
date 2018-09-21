import { ObjectId } from "bson";

export interface DraftEvent {
    poolerId: ObjectId;
    poolerName: string;
    player: Player;
    round: number;
}

export interface PoolModel {
    _id: ObjectId;
    name: string;
    picks: DraftEvent[];
    draftOrder: {poolerId: ObjectId, poolerName: string}[];
    started: boolean;
    admins: ObjectId[];
    maxRound: number;
    settings: {
        turns: number;
    }
}

export interface Player {
    _id: ObjectId;
    name: string;
    position: string;
    photoUrl: string;
    salary: number;
    predictions: any[];
    team: any;
}