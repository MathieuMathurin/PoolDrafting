import { Injectable } from '@angular/core';
import { Headers, Jsonp } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchPlayersService {
    constructor(private jsonp: Jsonp) { }

    private apiUrl = "http://localhost:3000";    

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getPlayers(): Promise<any[]> {
        return this.jsonp.get(this.apiUrl + '/players?callback=JSONP_CALLBACK')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

}