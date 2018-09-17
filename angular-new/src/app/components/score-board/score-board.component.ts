import { Component } from '@angular/core';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss']
})
export class ScoreBoardComponent {
  constructor() {
    this.mainAnim();
  }

  isLow = true;
  isOff = false;
  private flash = (initialValue: boolean) => {
    window.setTimeout(() => this.isLow = !initialValue, 750);
    window.setTimeout(() => this.isLow = initialValue, 900);
    window.setTimeout(() => this.isLow = !initialValue, 1000);
    window.setTimeout(() => this.isLow = initialValue, 1500);
  }

  private turnOff = () => {
    window.setTimeout(() => this.isOff = true, this.random(1500, 2500));
    window.setTimeout(() => this.isOff = false, 3500);
  }

  private holdToMax = (initialValue: boolean) => {
    window.setTimeout(() => this.isLow = !initialValue, this.random(1500, 2500));
    window.setTimeout(() => this.isLow = initialValue, 3500);
  }

  private blink = () => {
    window.setTimeout(() => this.isOff = true, 750);
    window.setTimeout(() => this.isOff = false, 1000);
    window.setTimeout(() => this.isOff = true, 1250);
    window.setTimeout(() => this.isOff = false, 1750);
  }

  private mainAnim = () => {
    this.blink();
    window.setTimeout(this.mainAnim, this.random(8000, 10000));
  }

  private random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
