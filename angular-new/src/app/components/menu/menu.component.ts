import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";
import { ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, public accountService: AccountService) { }

  isOpened: boolean;
  @Output() openChanged = new EventEmitter<boolean>();
  navigate = route => this.router.navigate([route]);

  ngOnInit() {
    this.isOpened = false;
  }

  toggle = () => {
    const newValue = !this.isOpened;
    this.isOpened = newValue;
    this.openChanged.emit(newValue);
  }
}
