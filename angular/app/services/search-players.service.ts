import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { IDictionary, Dictionary } from '../models/dictionary';
import { Filter } from '../models/filter';
import { Player } from '../models/player';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchPlayersService {
    constructor(private http: Http) { }

    private apiUrl = "http://" + window.location.hostname + ":3000";

    private parseResponse(response: Response): Player[]{
        var searchResults: any[] = response.json();
        //The search result are elasticsearch document (_.id => documentID, _source => player)
        return searchResults.map(rawPlayer => new Player(rawPlayer._id, rawPlayer._source));
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    private addFilters(url, filters: Dictionary<Filter>): string {
        let querystringFilters: {querystring: string, value: string}[] = [];
        
        let position: string[] = []        
        let salary: { querystring: string, value: string };
        let points: { querystring: string, value: string };

        if(filters){
            filters._values.forEach(filter => {
                let elasticSearchValue: { type: string, value: string } = filter.getElasticSearchValue();
                switch (elasticSearchValue.type) {
                    case "position":
                        position.push(elasticSearchValue.value);
                        break;                
                    case "salary":
                        salary = {querystring: elasticSearchValue.type, value: elasticSearchValue.value };
                        break;
                    case "points":
                        points = {querystring: elasticSearchValue.type, value: elasticSearchValue.value };
                        break;
                    default:
                        break;
                }

                if(position.length > 0){
                    var positionFilter = position.join("-");            
                    querystringFilters.push({querystring: "position", value: positionFilter});
                }
                if(salary){
                    querystringFilters.push(salary);
                }
                if(points){
                    querystringFilters.push(points);
                }
                
                querystringFilters.forEach(filter => {
                    
                    var hasQueryString = url.indexOf("?") !== -1;
                    var separator = hasQueryString ? '&' : '?'
                    
                    url = url + separator + filter.querystring + "=" + filter.value;                    
                });            
            });
        }
        return url;
    }

    getPlayers(filters: Dictionary<Filter>): Promise<Player[]> {
        let url = this.apiUrl + '/players';

        url = this.addFilters(url, filters);

        return this.http.get(url)
            .toPromise()
            .then(response => {
                return this.parseResponse(response);
            })
            .catch(this.handleError);
    }

    searchPlayers(searchTerm: string, fuzzy: boolean, filters: Dictionary<Filter>): Promise<Player[]> {
        let url = this.apiUrl + '/players/' + searchTerm;

        url = fuzzy ? url + "?fuzzy=true" : url;

        url = this.addFilters(url, filters);

        return this.http.get(url)
            .toPromise()
            .then(response => {
                return this.parseResponse(response);
            })
            .catch(this.handleError);
    }

}