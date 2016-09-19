import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from '../services/local-storage.service'

@Component({
    selector: 'team',
    templateUrl: 'app/team/team.component.html',
    providers:[
        LocalStorageService
    ]
})
export class TeamComponent implements OnInit{
     constructor(private localStorageService: LocalStorageService){ }
    players: any[];     

    ngOnInit(): void {
        this.players = this.localStorageService.load().user.players;
    }

    totalSalary(): number{
        let total = 0;
        this.players.forEach(p => total += p.Prediction.SAL);

        return total;
    }
 }