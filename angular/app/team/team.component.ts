import { Component, OnInit } from '@angular/core';

import { Player } from '../models/player';
import { Dictionary } from '../models/dictionary';
import { UserService } from '../services/user.service';

import { MdTab, MdTabGroup, MdTabChangeEvent } from '@angular2-material/tabs/tabs';

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
    tabs: Dictionary<{label: string, position: string}> = new Dictionary<{label: string, position: string}>([]);

    ngOnInit(): void {
        this.players = this.userService.load().players;

        this.tabs.add("all", {label: "Tous les joueurs", position: "all"});
        this.tabs.add("LW", {label: "Ailiers gauches", position: "LW"});
        this.tabs.add("C", {label: "Centres", position: "C"});
        this.tabs.add("RW", {label: "Ailiers droits", position: "RW"});
        this.tabs.add("D", {label: "Défenseurs", position: "D"});
        this.tabs.add("G", {label: "Gardiens", position: "G"});
    }

    totalSalary(position: string): number{
        let total = 0;
        if(position === "all"){
            this.players.forEach(player => total += player.Salary);
        }else{
            this.players
            .filter(player => player.Position === position)
            .forEach(player => total += player.Salary);
        }
        
        return total;
    }
    
    clear(player: Player){
        this.userService.update(player, false, () => {this.players = this.players.filter(p => p.Id !== player.Id)});
    }
    
    filter(position: string): Player[] {
        return this.players.filter(player =>  player.Position === position);        
    }

    count(position: string): number {
        return this.players.filter(player =>  player.Position === position).length;
    }    
        
 }