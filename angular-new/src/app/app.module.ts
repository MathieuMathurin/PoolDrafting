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
import { ControllerComponent } from './components/icons/controller/controller.component';
import { MenuIconComponent } from './components/icons/menu/menu-icon.component';
import { RinkComponent } from './components/icons/rink/rink.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { GamePlanComponent } from './components/icons/game-plan/game-plan.component';
import { PlayerIconComponent } from './components/icons/player-icon/player-icon.component';
import { WhistleComponent } from './components/icons/whistle/whistle.component';
import { CloseComponent } from './components/icons/close/close.component';
import { MenuComponent } from "./components/menu/menu.component";
import { LogoutComponent } from './components/icons/logout/logout.component';
import { LockerRoomComponent } from './components/icons/locker-room/locker-room.component';
import { SearchComponent } from './search/search.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { PositionFilterComponent } from './search/position-filter/position-filter.component';
import { SalaryFilterComponent } from './search/salary-filter/salary-filter.component';
import { TeamFilterComponent } from './search/team-filter/team-filter.component';
import { StatsFilterComponent } from './search/stats-filter/stats-filter.component';
import { OptionalInputComponent } from './components/optional-input/optional-input.component';
import { PlayerDescriptionComponent } from './components/player-description/player-description.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    LandingPageComponent,
    LoginComponent,
    ScoreBoardComponent,
    SignupComponent,
    ControllerComponent,
    MenuIconComponent,
    RinkComponent,
    DrawerComponent,
    GamePlanComponent,
    PlayerIconComponent,
    WhistleComponent,
    CloseComponent,
    MenuComponent,
    LogoutComponent,
    LockerRoomComponent,
    SearchComponent,
    SearchBarComponent,
    PositionFilterComponent,
    SalaryFilterComponent,
    TeamFilterComponent,
    StatsFilterComponent,
    OptionalInputComponent,
    PlayerDescriptionComponent
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
