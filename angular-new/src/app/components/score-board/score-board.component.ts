import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScoreBoardComponent  {
  @Input() showMenu = false;
}
