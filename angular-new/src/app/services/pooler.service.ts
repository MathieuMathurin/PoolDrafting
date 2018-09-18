import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PoolerService {
    constructor(private http: HttpClient) { }

    async signup(userName: string, password: string): Promise<boolean> {
        try {
            const response = await this.http.post("/poolers/signup", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();
            return Promise.resolve(response.status === 201);
        } catch (e) {
            return Promise.resolve(false);
        }

    }

    async login(userName: string, password: string): Promise<boolean> {
        try {
            const response = await this.http.post("/poolers/login", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();
            return Promise.resolve(response.status === 200);
        } catch(e) {
            return Promise.resolve(false);
        }
    }
}
