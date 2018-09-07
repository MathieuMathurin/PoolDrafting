import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router) { }

    canActivate() {
        const authToken = this.cookieService.get("authToken");
        if (!!authToken) {
            this.router.navigate(["/home"]);
        }



        return !authToken;
    }
}
