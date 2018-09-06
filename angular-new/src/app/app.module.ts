import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { routing } from './app.routing';
import { AngularMaterialModule } from "./modules";

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InputComponent } from './components';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
