import { Component, OnInit, Input } from '@angular/core';
import { Pick } from "../../models/pick";

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  constructor() { }

  @Input() myPicks: Pick[];

  ngOnInit() {
    this.myPicks = [];
  }

  getForwards = (): { name: string, count: number }[] => {
    const positions = {
      "AG": "LW", 
      "C": "C", 
      "AD": "RW"
    };
    
    return Object.entries(positions).map(([name, value]) => ({ name, count: this.myPicks.filter(p => p.player.position === value).length }));
  }

  getDefs = (): { name: string, count: number }[] => {
    const positions = {
      "DEF": "D",
      "G": "G"
    };
    
    return Object.entries(positions).map(([name, value]) => ({ name, count: this.myPicks.filter(p => p.player.position === value).length }));
  }

    getTotalPoints = () => {
      return this.myPicks.reduce((total, pick) => total += pick.player.prediction ? pick.player.prediction.points : 0, 0);
    }

    getTotalSalaryHit = () => {
      const salaryHit = this.myPicks.reduce((total, pick) => total += pick.player.salary ? pick.player.salary : 0, 0);
      return salaryHit / 1000000;
    }

  }
