import { Component, Input } from '@angular/core';
import { ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { AccountService } from "../../services/account.service";

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DrawerComponent {

  constructor(private router: Router, public accountService: AccountService) { }

  @Input() teamName: string;

  navigate = route => this.router.navigate([route]);
}
