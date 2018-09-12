import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from "./account.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {
    constructor(private accountService: AccountService, private router: Router) { }

    canActivate() {        
        if (this.accountService.isAuthenticated) {
            this.router.navigate(["/home"]);
        }

        return !this.accountService.isAuthenticated;
    }
}
