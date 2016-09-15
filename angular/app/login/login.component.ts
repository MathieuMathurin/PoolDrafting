import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Import services
import {LocalStorageService} from '../services/local-storage.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [
        LocalStorageService
    ]
})
export class LoginComponent implements OnInit {
    constructor(private localStorageService: LocalStorageService, private router: Router){}    

    ngOnInit(): void {

    }

    saveUser(): void {
        this.localStorageService.save('test');        
        this.router.navigate(['/search']);
    }
 }