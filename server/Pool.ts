import { ObjectId } from "bson";
import { PoolModel, DraftEvent } from "./mongoModels";

export class Pool {
    constructor(private _pool: PoolModel) {
        const { draftOrder, picks } = _pool;
        this._draftOrder = draftOrder;
        const normalPicks = picks.filter(pick => pick.round !== null);
        this.replayDraft(normalPicks);
    }

    get round() {
        return this._round;
    }

    get draftingPooler() {
        let draftingPooler: { poolerId: ObjectId, poolerName: string };
        switch (this.round % 2) {
            // Reverse order
            case 0:
                draftingPooler = this.findFirstPoolerWhoDidNotDraftInReverseOrder()
                break;
            // Regular order
            case 1:
                draftingPooler = this.findFirstPoolerWhoDidNotDraftInDraftOrder();
                break;
        }

        return draftingPooler;
    }

    get roundState() {
        return this._roundState;
    }

    get draftOrder() {
        switch (this.round % 2) {
            // Reverse Order
            case 0:
                return this._draftOrder.reverse();
            // Regular Order
            case 1:
                return this._draftOrder;
        }
    }

    get isPoolDone() {
        return this._pool.settings.turns === this._round && this.isRoundDone;
    }

    get isRoundDone() {
        return Object.values(this._roundState).every(hasPoolerDrafted => hasPoolerDrafted);
    }

    isPlayerAvailable = (playerId: ObjectId) => {
        return !this._pool.picks.some((pick, index, arr) => pick.player._id.equals(playerId));
    }

    isPoolerAllowedToDraft = (poolerId: ObjectId) => {
        return !this._pool.picks.filter(pick => pick.round === this.round).some((pick, index, arr) => pick.poolerId.equals(poolerId));
    }

    private _round: number = 0;
    private _draftOrder: { poolerId: ObjectId, poolerName: string }[];
    private _roundState: { [key: string]: boolean };

    private replayDraft(draftEvents: DraftEvent[]) {
        if (!this._pool.started) {
            this._round = 0;
            this._roundState = {};
            return;
        }

        const roundsMap: { [key: number]: number } = [];

        draftEvents.map(event => event.round)
            .forEach(round => {
                if (!roundsMap[round]) {
                    roundsMap[round] = round;
                }
            });

        const rounds = Object.values(roundsMap);

        let greatestRound = rounds.reduce((greatest, round) => round > greatest ? round : greatest, rounds[0]) || 1;
        this._round = greatestRound;
        this.initRoundState(greatestRound);

        if (!this.isPoolDone && this.isRoundDone) {
            this._roundState = null;
            greatestRound += 1;
            this._round = greatestRound;
            this.initRoundState(greatestRound);
        }
    }

    private initRoundState(currentRound: number) {
        this._roundState = {};
        const currentRoundPicks = this._pool.picks.filter(event => event.round === currentRound);

        this._pool.draftOrder.forEach(pooler => {
            const hasPoolerDrafted = currentRoundPicks.some((event, index, arr) => event.poolerId.equals(pooler.poolerId));
            this._roundState[pooler.poolerId.toHexString()] = hasPoolerDrafted;
        })
    }

    private findFirstPoolerWhoDidNotDraftInDraftOrder() {
        if (!this._pool.started) {
            return;
        }

        let draftingPooler: { poolerId: ObjectId, poolerName: string };
        for (let i = 0; i < this._draftOrder.length; ++i) {
            const pooler = this._draftOrder[i];

            if (!this._roundState[pooler.poolerId.toHexString()]) {
                draftingPooler = pooler;
                break;
            }
        }

        return draftingPooler;
    }

    private findFirstPoolerWhoDidNotDraftInReverseOrder() {
        if (!this._pool.started) {
            return;
        }

        let draftingPooler: { poolerId: ObjectId, poolerName: string };
        for (let i = this._draftOrder.length - 1; i >= 0; --i) {
            const pooler = this._draftOrder[i];

            if (!this._roundState[pooler.poolerId.toHexString()]) {
                draftingPooler = pooler;
                break;
            }
        }

        return draftingPooler;
    }
}