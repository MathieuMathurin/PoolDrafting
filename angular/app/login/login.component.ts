import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Import services
import { LocalStorageService } from '../services/local-storage.service';

import { MdInput } from '@angular2-material/input/input';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    providers: [
        LocalStorageService
    ]
})
export class LoginComponent implements OnInit{
    constructor(private localStorageService: LocalStorageService, private router: Router){}      
    userName: string;
    isValid: boolean;

    ngOnInit(): void {
        this.isValid = false;
    }

    saveUser(name): void {
        var router = this.router;
        var callback = function(){router.navigate(['/search'])};
        this.localStorageService.save(name, callback);        
        
    }

    validateUser(): void{
        this.isValid = Boolean(this.userName);
    }
 }