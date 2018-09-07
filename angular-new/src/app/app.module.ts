import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { routing } from './app.routing';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from "./modules";

import { AppComponent } from './app.component';
import { InputComponent } from './components';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './landing-page/login/login.component';
import { ScoreBoardComponent } from './components/score-board/score-board.component';
import { SignupComponent } from './landing-page/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LandingPageComponent,
    LoginComponent,
    ScoreBoardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
