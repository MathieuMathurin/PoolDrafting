import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Import services
import {LocalStorageService} from '../services/local-storage.service';

//Import material design components
import {MdButton} from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdSidenav } from '@angular2-material/sidenav/sidenav';

@Component({
    selector: 'my-app',
    templateUrl: 'app/main-app/main-app.component.html',
    providers: [
        LocalStorageService
    ]
})
export class MainAppComponent implements OnInit {
    constructor(private localStorageService: LocalStorageService, private router: Router) { }
    isLoggedIn: boolean;

    scrollTo = function scrollTo(element, to, duration) {
        if (duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function () {
            element.scrollTop = element.scrollTop + perTick;
            if (element.scrollTop === to) return;
            scrollTo(element, to, duration - 10);
        }, 10);
    };

    ngOnInit(): void {
        this.isLoggedIn = this.localStorageService.isLoggedIn();

        this.router.events.subscribe(event => {
            this.isLoggedIn = this.localStorageService.isLoggedIn();

            this.scrollTo(document.body, 0, 600);
        });

    }

}