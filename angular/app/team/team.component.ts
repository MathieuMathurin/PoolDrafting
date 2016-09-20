import { Component, OnInit } from '@angular/core';

import { Player } from '../models/player';
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
    players: Player[];     

    ngOnInit(): void {
        this.players = this.userService.load().players;
    }

    totalSalary(): number{
        let total = 0;
        this.players.forEach(p => total += p.Salary);
        
        return total;
    }
    clear(player: Player){
        this.userService.update(player, false, () => {this.players = this.players.filter(p => p.Id !== player.Id)});
    }
 }