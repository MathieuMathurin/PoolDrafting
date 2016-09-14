import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { SearchComponent } from './search.component';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [
        AppComponent,
        SearchComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }