export class Player {
    _id: string;
    name: string;
    position: string;
    jersey: number;
    height: number;
    weight: number;
    photoUrl: string;
    salary: number;
    prediction: {
        gamePlayed: number;
        victories?: number;
        defeats?: number;
        overtimeDefeats?: number;
        blanks?: number;
        points: number;
        goals?: number;
        passes?: number;
        pointPerMatch: string;
    };
    team: { Key: string, Name: string, City: string };
}
