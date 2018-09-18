import { Component, Input, OnInit } from '@angular/core';
import { Player } from "../../models/player";

@Component({
  selector: 'app-player-description',
  templateUrl: './player-description.component.html',
  styleUrls: ['./player-description.component.scss']
})
export class PlayerDescriptionComponent implements OnInit {
  @Input() player: Player;

  expanded: boolean;

  ngOnInit() {
    this.expanded = false;
  }

  toggle = () => {
    this.expanded = !this.expanded;
  }
}
