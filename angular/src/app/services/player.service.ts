import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  async search(searchTerm: string, positions: string[], salaries: { min?: number, max?: number }, team: string): Promise<Player[]> {
    try {
      const params = {
        searchTerm
      };

      if (positions.some((p, i, a) => !!p)) {
        params["positions"] = positions;
      }

      if (team && team.trim()) {
        params["team"] = team;
      }

      if (salaries) {
        if (salaries.min) {
          params["min"] = salaries.min * 1000000;
        }

        if (salaries.max) {
          params["max"] = salaries.max  * 1000000;
        }
      }

      const response = await this.http.get("/players", { observe: "response", responseType: "text", params: params }).toPromise();
      const data = response.body;
      return Promise.resolve(JSON.parse(data));
    } catch (e) {
      return Promise.resolve([]);
    }
  }

  async draft(playerId: string): Promise<boolean> {
    try {
      const response = await this.http.post(`/players/${playerId}`, {}, { observe: "response", responseType: "text" }).toPromise();
      return Promise.resolve(response.status === 200);
    } catch (e) {
      return Promise.resolve(false);
    }
  }
}
