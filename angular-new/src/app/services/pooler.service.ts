import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
    providedIn: 'root'
})
export class PoolerService {
    constructor(private http: HttpClient) { }

    localStorageKey = 'poolUser';

    private apiUrl = "http://" + window.location.hostname + ":3000";

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    load(): { name: string, players: Player[] } {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    }

    async save(userName: string, password: string): Promise<void> {
        const response = await this.http.post("/poolers", { user: { userName, password } }, { observe: "response", responseType: "text" }).toPromise();
        if (response.status === 201) {
            window["userId"] = response.headers.get("Location");
        }
    }

    // update(player: Player, isSelected: boolean, callback): void {
    //     const url = this.apiUrl + '/player/update';

    //     const newModel = this.load();

    //     if (!isSelected) {
    //         newModel.players = newModel.players.filter(p => p.Id !== player.Id);
    //     }

    //     const postModel = {
    //         isSelected: isSelected,
    //         player_id: player.Id
    //     };

    //     this.http.post(url, postModel)
    //         .toPromise()
    //         .then(response => {
    //             if (isSelected) {
    //                 const newPlayer = response.json();
    //                 newModel.players.push(new Player(newPlayer._id, newPlayer._source));
    //             }
    //             localStorage.setItem(this.localStorageKey, JSON.stringify(newModel));
    //             callback();
    //         })
    //         .catch(this.handleError);
    // }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.localStorageKey));
    }
}
