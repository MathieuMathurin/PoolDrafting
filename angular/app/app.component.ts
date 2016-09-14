import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<h1>App Component view</h1>
                <a routerLink="/login">Login</a>
                <a routerLink="/search">Search</a>
                <router-outlet></router-outlet>`
})
export class AppComponent { }