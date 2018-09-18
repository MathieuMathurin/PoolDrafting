import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  async search(searchTerm: string, positions: string[], team: string): Promise<Player[]> {
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
      
      const response = await this.http.get("/players", { observe: "response", responseType: "text", params: params }).toPromise();
      const data = response.body;
      return Promise.resolve(JSON.parse(data));
    } catch (e) {
      return Promise.resolve([]);
    }
  }
}
