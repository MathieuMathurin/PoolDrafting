import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from "./services/account.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private accountService: AccountService) { }

  isAuthenticated = false;
  teamName: string;
  isNavigationOpen: boolean;
  private _subscriptions: Subject<{}>[] = [];

  ngOnInit() {
    this.isNavigationOpen = false;

    this.isAuthenticated = this.accountService.isAuthenticated;
    this._subscriptions.push(this.accountService.authenticationChanges.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    }));

    this.teamName = this.accountService.userState.teamName;
    this._subscriptions.push(this.accountService.userStateChanges.subscribe(userState => {
      this.teamName = userState.teamName;
    }));
  }

  ngOnDestroy() {
    this._subscriptions.map(sub => sub.unsubscribe());
  }

  onOpenChanged = isOpen => this.isNavigationOpen = isOpen;
}
