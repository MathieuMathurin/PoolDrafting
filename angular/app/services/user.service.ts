import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';

import { Player } from '../models/player';

@Injectable()
export class UserService {
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

    update(player: Player, isSelected: boolean, callback): void {
        let url = this.apiUrl + '/user/update';        

        var newModel = this.load();

        newModel.user.players.push(player);
        localStorage.setItem(this.localStorageKey, JSON.stringify(newModel));
        
        var postModel = {
            player: player.getSubmitModel(true),
            player_id: player.Id
        };

        this.http.post(url, postModel)
            .toPromise()
            .then(response => {
                callback();
            })
            .catch(this.handleError);        
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.localStorageKey));
    }
}