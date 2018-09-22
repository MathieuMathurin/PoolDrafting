import { Component } from '@angular/core';
import { ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent {
    isSignUpSelected = false;
    isLoginSelected = false;

    onSignupMouseEnter = () => {
        this.isSignUpSelected = true;
    }

    onSignupMouseOut = () => {
        this.isSignUpSelected = false;
    }

    onLoginMouseEnter = () => {
        this.isLoginSelected = true;
    }

    onLoginMouseOut = () => {
        this.isLoginSelected = false;
    }
}
