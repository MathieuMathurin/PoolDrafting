import { Injectable } from '@angular/core';
import { Headers, Jsonp } from '@angular/http';

import { IDictionary, Dictionary } from '../models/dictionary';
import { Filter } from '../models/filter';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchPlayersService {
    constructor(private jsonp: Jsonp) { }

    private apiUrl = "http://" + window.location.hostname + ":3000";

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    addFilters(url, filters: Dictionary): string {
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
                
                querystringFilters.forEach(f => {
                    url = url + "&" + f.querystring + "=" + f.value;
                });            
            });
        }
        return url;
    }

    getPlayers(filters: Dictionary): Promise<any[]> {
        let url = this.apiUrl + '/players?callback=JSONP_CALLBACK';

        url = this.addFilters(url, filters);

        return this.jsonp.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    searchPlayers(searchTerm: string, fuzzy: boolean, filters: Dictionary): Promise<any[]> {
        let url = this.apiUrl + '/players/' + searchTerm + '?callback=JSONP_CALLBACK';

        url = fuzzy ? url + "&fuzzy=true" : url;

        url = this.addFilters(url, filters);

        return this.jsonp.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

}