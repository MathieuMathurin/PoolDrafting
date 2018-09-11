import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
    providedIn: 'root'
})
export class PoolerService {
    constructor(private http: HttpClient) { }

    async signup(userName: string, password: string): Promise<boolean> {
        const response = await this.http.post("/poolers/signup", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();

        return Promise.resolve(response.status === 201);
    }

    async login(userName: string, password: string): Promise<boolean> {
        const response = await this.http.post("/poolers/login", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();

        return Promise.resolve(response.status === 200);
    }
}
