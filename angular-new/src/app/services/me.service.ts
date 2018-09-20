import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pool } from "../models/pool";
import { Pick } from "../models/pick";

@Injectable({
  providedIn: 'root'
})
export class MeService {
  constructor(private http: HttpClient) { }

  async getPoolState(): Promise<Pool> {
    try {
      const response = await this.http.get("/me/pool/", { observe: "response", responseType: "text" }).toPromise();
      return Promise.resolve(JSON.parse(response.body) as Pool);
    } catch (e) {
      return Promise.resolve(null);
    }
  }

  async getMyPicks(): Promise<Pick[]> {
    try {
      const response = await this.http.get("/me/picks/", { observe: "response", responseType: "text" }).toPromise();
      return Promise.resolve(JSON.parse(response.body) as Pick[]);
    } catch (e) {
      return Promise.resolve([]);
    }
  }
}
