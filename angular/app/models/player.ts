export class Player {
    Id: string;
    IsSelected: boolean;
    Name: string;
    Points: number;
    Position: string;
    PhotoUrl: string;
    Salary: number;
    Stats: any[];
    Summary: string;

    private rawPlayer: any;

    constructor(playerID: string, playerObject: any){
        this.Id = playerID;
        this.Name = playerObject.Name;
        this.Position = playerObject.Position;
        this.IsSelected = playerObject.IsSelected;    
        this.PhotoUrl = playerObject.PhotoUrl;    

        this.Stats = [];
        if(playerObject.Prediction){            
            this.Points = this.Position == "G" ? playerObject.Prediction.VIC * 2 : playerObject.Prediction.PTS;            
            this.Salary = playerObject.Prediction.SAL;
            this.Summary = playerObject.Prediction.Summary;  
            
            let pred = playerObject.Prediction;
            this.Stats.push({displayValue: "2016-2017", value: {GP: pred.PJ, G: pred.BTS, A: pred.PAS, W: pred.VIC, L: pred.DEF, OT: pred.DP, SOW: pred.BL, SOL: 0}});

        }

        if(playerObject.Stats){
            this.Stats.push({displayValue: "2015-2016", value: playerObject.Stats["2015-2016"]});
            this.Stats.push({displayValue: "2014-2015", value: playerObject.Stats["2014-2015"]});
            this.Stats.push({displayValue: "2013-2014", value: playerObject.Stats["2013-2014"]});            
        }

        this.rawPlayer = playerObject;
    }    

    getSubmitModel(isSelected: boolean){
        this.rawPlayer.IsSelected = isSelected;
        return this.rawPlayer;
    }
}