import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor() { }
  _searchTerm: string; 

  ngOnInit() {
    this._searchTerm = "";
  }


  onSearchValueChanged = value => {
    this._searchTerm = value;
  }

}
