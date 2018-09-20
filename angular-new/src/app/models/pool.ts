export interface Pool {
    draftingPooler: {
        poolerId: string,
        poolerName: string
    };
    round: number;
    draftOrder: { poolerId: string, poolerName: string };
    roundState: { [key: string]: boolean };
}
