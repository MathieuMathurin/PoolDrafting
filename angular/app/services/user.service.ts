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

    load(): {name: string, players: Player[]} {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    }

    save(name: string, callback: Function): void {
        //Send info to server by http
        // let url = this.apiUrl + '/user/create/' + name;

        // this.http.get(url)
        //     .toPromise()
        //     .then(response => {
        //         localStorage.setItem(this.localStorageKey, JSON.stringify(response.json()));
        //         callback();
        //     })
        //     .catch(this.handleError);
        var user = {
            name: name,
            players: []
        };
        localStorage.setItem(this.localStorageKey, JSON.stringify(user));
        callback();
    }

    update(player: Player, isSelected: boolean, callback): void {
        let url = this.apiUrl + '/player/update';        

        var newModel = this.load();
        
        if(!isSelected){
            newModel.players = newModel.players.filter(p => p.Id !== player.Id);            
        }        
        
        var postModel = {
            isSelected: isSelected,
            player_id: player.Id
        };

        this.http.post(url, postModel)
            .toPromise()
            .then(response => {
                if(isSelected){                    
                    var newPlayer = response.json();
                    newModel.players.push(new Player(newPlayer._id, newPlayer._source));
                }
                localStorage.setItem(this.localStorageKey, JSON.stringify(newModel));
                callback();
            })
            .catch(this.handleError);        
    }

    isLoggedIn(): boolean {
        return Boolean(localStorage.getItem(this.localStorageKey));
    }
}