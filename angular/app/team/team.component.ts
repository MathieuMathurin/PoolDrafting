import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user.service'

@Component({
    selector: 'team',
    templateUrl: 'app/team/team.component.html',
    providers:[
        UserService
    ]
})
export class TeamComponent implements OnInit{
     constructor(private userService: UserService){ }
    players: any[];     

    ngOnInit(): void {
        this.players = this.userService.load().user.players;
    }

    totalSalary(): number{
        let total = 0;
        this.players.forEach(p => total += p.Prediction.SAL);

        return total;
    }
 }