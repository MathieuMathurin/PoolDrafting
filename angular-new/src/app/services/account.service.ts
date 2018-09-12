import { Injectable, Output, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient) {
    const authToken = this.cookieService.get("authToken");
    if (authToken) {
      this.userStateChanges.emit(this.getUserState());
      this.userState = this.getUserState();
    }
    this.authenticationChanges.emit(!!authToken);
    this.isAuthenticated = !!authToken;
  }

  @Output() authenticationChanges = new EventEmitter<boolean>();
  @Output() userStateChanges = new EventEmitter<any>();
  public isAuthenticated = false;
  public userState: any = {};

  logout = () => {
    this.cookieService.deleteAll();
    this.isAuthenticated = false;
    this.userState = {};

    this.authenticationChanges.emit(this.isAuthenticated);
    this.userStateChanges.emit(this.userState);


    this.router.navigate(["/signup"]);
  }

  async signup(userName: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post("/poolers/signup", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();
      const isAuthenticated = response.status === 201;
      if (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
        this.authenticationChanges.emit(isAuthenticated);
        this.userState = this.getUserState();
        this.userStateChanges.emit(this.getUserState());
      }

      return Promise.resolve(isAuthenticated);
    } catch (e) {
      return Promise.resolve(false);
    }

  }

  async login(userName: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post("/poolers/login", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();
      const isAuthenticated = response.status === 200;
      if (isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
        this.authenticationChanges.emit(isAuthenticated);
        this.userState = this.getUserState();
        this.userStateChanges.emit(this.getUserState());
      }

      return Promise.resolve(isAuthenticated);
    } catch (e) {
      return Promise.resolve(false);
    }
  }

  private getUserState() {
    let userStateObject = {};
    const userState = this.cookieService.get("userState");
    if (userState) {
      userStateObject = JSON.parse(decodeURI(userState));
    }

    return userStateObject;
  }
}
