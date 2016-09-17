import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

@Injectable()
export class LocalStorageService {
    constructor(private http: Http) { }
    localStorageKey = 'poolUser';

    private apiUrl = "http://" + window.location.hostname + ":3000";

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    load(): any {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    }

    save(name: string, callback: Function): void {
        //Send info to server by http
        let url = this.apiUrl + '/user/create/' + name;

        this.http.get(url)
            .toPromise()
            .then(response => {
                localStorage.setItem(this.localStorageKey, JSON.stringify(response.json()));
                callback();
            })
            .catch(this.handleError);
    }

    update(player: any, playerID: any, callback): void {
        let url = this.apiUrl + '/user/update';

        player.IsSelected = true;

        var newModel = this.load();
        newModel.user.players.push(player);
        localStorage.setItem(this.localStorageKey, JSON.stringify(newModel));

        /* id -> user id
         * name -> user name
         * players -> user players
         * player -> selected player
         * player_id -> selected player id
        */
        var postModel = {
            id: newModel.id,
            name: newModel.user.name,
            players: newModel.user.players,
            player: player,
            player_id: playerID
        };

        this.http.post(url, postModel)
            .toPromise()
            .then(response => {
                
            })
            .catch(this.handleError);
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.localStorageKey));
    }
}