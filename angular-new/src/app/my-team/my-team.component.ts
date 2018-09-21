import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from "@angular/router";
import { MeService } from "../services/me.service";
import { Pick } from "../models/pick";

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit {

  constructor(private me: MeService, private router: Router) { }
  myPicks: Pick[];

  ngOnInit() {
    this.myPicks = [];
    this.getMyPicks();
  }

  private getMyPicks = async () => {
    try {
      const myPicks = await this.me.getMyPicks();
      this.myPicks = myPicks.reverse();
    } catch (e) {
      // do nothing since we don't want to loose the loaded data
    }
  }
}