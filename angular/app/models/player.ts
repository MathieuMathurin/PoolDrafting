export class Player {
    Id: string;
    Name: string;
    Position: string;
    Salary: number;
    Points: number;
    PhotoUrl: string;
    IsSelected: boolean;

    constructor(playerID: string, playerObject: any){
        this.Id = playerID;
        this.Name = playerObject.Name;
        this.Position = playerObject.Position;
        this.IsSelected = playerObject.IsSelected;
        if(playerObject.Prediction){
            this.Points = playerObject.Prediction.PTS;
            this.Salary = playerObject.Prediction.SAL;
        } 
    }    
}