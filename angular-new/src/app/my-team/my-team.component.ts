import { Component, OnInit } from '@angular/core';
import { MeService } from "../services/me.service";
import { Player } from "../models/player";

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  constructor(private me: MeService) { }
  myPlayers: Player[];

  ngOnInit() {
    this.me.getMyPicks().then(myPicks => this.myPlayers = myPicks.map(pick => pick.player).reverse()).catch(err => this.myPlayers = []);
  }
}
