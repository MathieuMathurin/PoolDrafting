import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.scss']
})
export class TeamFilterComponent implements OnInit {

  constructor() { }

  @Output() filterChanged = new EventEmitter<string>();
  _value: string;
  teams = [
    {
      Key: "",
      Name: ""
    },
    {

      "Key": "BOS",

      "City": "Boston",
      "Name": "Bruins",



    },
    {

      "Key": "BUF",

      "City": "Buffalo",
      "Name": "Sabres",



    },
    {

      "Key": "DET",

      "City": "Detroit",
      "Name": "Red Wings",



    },
    {

      "Key": "MON",

      "City": "Montreal",
      "Name": "Canadiens",



    },
    {

      "Key": "OTT",

      "City": "Ottawa",
      "Name": "Senators",



    },
    {

      "Key": "TB",

      "City": "Tampa Bay",
      "Name": "Lightning",



    },
    {

      "Key": "TOR",

      "City": "Toronto",
      "Name": "Maple Leafs",



    },
    {

      "Key": "FLA",

      "City": "Florida",
      "Name": "Panthers",



    },
    {

      "Key": "CAR",

      "City": "Carolina",
      "Name": "Hurricanes",



    },
    {

      "Key": "NJ",

      "City": "New Jersey",
      "Name": "Devils",



    },
    {

      "Key": "NYI",

      "City": "New York",
      "Name": "Islanders",



    },
    {

      "Key": "NYR",

      "City": "New York",
      "Name": "Rangers",



    },
    {

      "Key": "PHI",

      "City": "Philadelphia",
      "Name": "Flyers",



    },
    {

      "Key": "PIT",

      "City": "Pittsburgh",
      "Name": "Penguins",



    },
    {

      "Key": "WAS",

      "City": "Washington",
      "Name": "Capitals",



    },
    {

      "Key": "CBJ",

      "City": "Columbus",
      "Name": "Blue Jackets",



    },
    {

      "Key": "CHI",

      "City": "Chicago",
      "Name": "Blackhawks",



    },
    {

      "Key": "DAL",

      "City": "Dallas",
      "Name": "Stars",



    },
    {

      "Key": "COL",

      "City": "Colorado",
      "Name": "Avalanche",



    },
    {

      "Key": "STL",

      "City": "St. Louis",
      "Name": "Blues",



    },
    {

      "Key": "NAS",

      "City": "Nashville",
      "Name": "Predators",



    },
    {

      "Key": "WPG",

      "City": "Winnipeg",
      "Name": "Jets",



    },
    {

      "Key": "MIN",

      "City": "Minnesota",
      "Name": "Wild",



    },
    {

      "Key": "CGY",

      "City": "Calgary",
      "Name": "Flames",



    },
    {

      "Key": "EDM",

      "City": "Edmonton",
      "Name": "Oilers",



    },
    {

      "Key": "LA",

      "City": "Los Angeles",
      "Name": "Kings",



    },
    {

      "Key": "SJ",

      "City": "San Jose",
      "Name": "Sharks",



    },
    {

      "Key": "VAN",

      "City": "Vancouver",
      "Name": "Canucks",



    },
    {

      "Key": "ARI",

      "City": "Arizona",
      "Name": "Coyotes",



    },
    {

      "Key": "ANA",

      "City": "Anaheim",
      "Name": "Ducks",



    },
    {

      "Key": "VEG",

      "City": "Vegas",
      "Name": "Golden Knights",



    }
  ].sort((teamA, teamB) => teamA.Name.localeCompare(teamB.Name));

  ngOnInit() {
    this._value = "";
  }

  onValueChanged = $event => {
    const value = $event.value;
    this._value = value;
    this.filterChanged.emit(value);
  }

  clear = () => {
    this._value = "";
  }
}
