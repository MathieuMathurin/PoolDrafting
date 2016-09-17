export interface Filter {        
    getElasticSearchValue(): {type: string, value: string};
}