import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private cookieService: CookieService) {  }

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = !!this.cookieService.get("authToken");
  }
}
