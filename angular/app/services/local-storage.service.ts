import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class LocalStorageService{
    localStorageKey = 'poolUser';

    load(): string {
        return localStorage.getItem(this.localStorageKey);
    }

    save(name: string): void {
        localStorage.setItem(this.localStorageKey, name);
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.localStorageKey));
    }
}