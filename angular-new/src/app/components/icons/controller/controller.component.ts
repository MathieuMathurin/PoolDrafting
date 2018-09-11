import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-controller-icon',
  templateUrl: './controller.component.html'
})
export class ControllerComponent implements OnInit {
  @Input() height: number;
  @Input() width: number;
  style: { height: number, width: number };

  ngOnInit() {
    this.style = { height: this.height, width: this.width };
  }
}
