import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataServiceService } from './data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular-Project';
  public street: string;
  public city: string;
  public state: string;
  public currentLocation: boolean;

  public city1: string;

  public streetHasError: boolean;
  public cityHasError: boolean;
  public stateHasError: boolean;
  public tempStreet: string;
  public tempCity: string;
  public disableStreet: boolean;
  public disableCity: boolean;
  public disableState: boolean;
  public reset: boolean;


  public test: boolean;
  public showFavorites: boolean;
  public time: string;

  public tweet: string;

  public favorites: any;
  public suggestions: any;

  public progressbar: boolean;
  public noColor: boolean;

  public error: boolean;
  public errorText: string;
  public resultSelected: boolean;

  constructor(private http: HttpClient, private _dataService: DataServiceService, private router: Router) {
    this.setToDeafault();
  }

  setToDeafault() {
    this.tweet = "";
    this.street = "";
    this.city = "";
    this.city1 = "";
    this.state = "XX";
    this.currentLocation = false;

    this.streetHasError = true;
    this.cityHasError = true;
    this.stateHasError = true;

    this.disableStreet = false;
    this.disableCity = false;
    this.disableState = false;
    this.reset = true;

    this.test = false;
    this.showFavorites = false;
    this.progressbar = false;

    this.favorites = [];

    this.suggestions = [];

    this.noColor = false;
    this.error = false;
    this.errorText = "";

    this.resultSelected = true;
  }
  validateStreet(value) {
    this.reset = false;
    this.tempStreet = value;
    if (this.tempStreet.trim().length == 0) {
      this.streetHasError = true;
      this.street = "";
    } else {
      this.streetHasError = false;
    }
  }
  validateCity(value) {
    this.reset = false;
    this.tempCity = value;
    if (this.tempCity.trim().length == 0) {
      this.cityHasError = true;
      this.city = "";
    } else {
      this.cityHasError = false;
    }
  }
  validateState(value) {
    this.reset = false;
    if (value == 'XX') {
      this.stateHasError = true;
    } else {
      this.stateHasError = false;
    }
  }
  disableInputs() {
    this.reset = false;
    if (this.currentLocation) {
      this.disableStreet = true;
      this.disableCity = true;
      this.disableState = true;
    } else {
      this.disableStreet = false;
      this.disableCity = false;
      this.disableState = false;
    }
  }
  clearInputs() {
    this.setToDeafault();
  }
  search() {
    //this.setToDeafault();
    this.showFavorites = false;
    this.progressbar = true;
    this.error = false;
    if (this.currentLocation) {
      this.http.get('http://ip-api.com/json').subscribe((response) => {
        if (response['status'] == 'success') {
          this.city1 = response['city'];
          this.forecast(response['lat'], response['lon'], response['city'], response['region']);
        }
      });
    } else {
      this.city1 = this.city;
      this.geocode(this.street, this.city, this.state);
    }

  }

  getStar() {
    this.noColor = false;
    if (localStorage.getItem(this._dataService.city) != null)
      this.noColor = true;
  }
  displayStoredData(key: string) {
    this.showFavorites = false;
    this.progressbar = true;
    this.error = false;
    //console.log(this.favorites[key]['city']);
    this.city1 = this.favorites[key]['city'];
    this.forecast(this.favorites[key]['lat'], this.favorites[key]['lon'], this.favorites[key]['city'], this.favorites[key]['state']);
  }

  setFavorite() {
    this.noColor = true;
    var localStorageItem = { seal: this._dataService.seal, city: this._dataService.city, state: this._dataService.state, lat: this._dataService.lat, lon: this._dataService.lon, position: "" };
    localStorage.setItem(this._dataService.city, JSON.stringify(localStorageItem));
  }

  delFavorite() {
    this.noColor = false;
    localStorage.removeItem(this._dataService.city);
  }

  favoritesClicked() {
    this.resultSelected = false;
    if (localStorage.length > 0) {
      this.test = false;
      this.showFavorites = true;
      this.favorites = [];
      this.error = false;
      var j = 0;
      for (var i = localStorage.length - 1; i >= 0; i--) {
        this.favorites[j++] = JSON.parse(localStorage.getItem(localStorage.key(i)));
      }
    }
    else {
      this.error = true;
      this.test = false;
      this.showFavorites = false;
      this.errorText = "No Records.";
    }

  }

  resultsClicked() {
    this.test = true;
    this.error = false;
    this.showFavorites = false;
    this.resultSelected = true;
  }

  deleteFavorite(key) {
    localStorage.removeItem(key);
    this.favoritesClicked();
  }
  geocode(street, city, state) {
    this.http.get('http://localhost:8000/getGeoCode?street=' + encodeURI(street) + '&city=' + encodeURI(city) + '&state=' + state).subscribe((response) => {
      if (response['status'] == 'OK') {
        this.error = false;
        this.forecast(response['results'][0]['geometry']['location']['lat'], response['results'][0]['geometry']['location']['lng'], city, state);
      }
      else {
        this.error = true;
        this.errorText = "Invalid Address.";
      }
    });
  }

  forecast(latitude, longitude, city, state) {
    //http://localhost:8000
    this.http.get('http://localhost:8000/getForecast?latitude=' + latitude + '&longitude=' + longitude).subscribe((response) => {

      var parsed = JSON.parse(response.toString());
      this._dataService.sendMessage(response.toString());
      this._dataService.setCity(city);
      this._dataService.setState(state);
      this.getStar();

      this.tweet = "https://twitter.com/intent/tweet?text=The%20current%20temperature%20at%20" + this._dataService.city + "%20is%20" + parsed['currently']['temperature'] + "%C2%B0%20F.%20The%20weather%20conditions%20are%20" + parsed['currently']['summary'] + ".&hashtags=CSCI571WeatherSearch";

      this._dataService.setSeal('https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Seal_of_California.svg/2000px-Seal_of_California.svg.png');

      this.progressbar = false;
      this.test = true;
      //console.log("here");
      this.router.navigate(['/card-chart']);
      /*
      this.http.get('/getSeal?state='+state).subscribe((response)=>{
      
        var parsed=JSON.parse(response.toString());
        this._dataService.setSeal(parsed['items'][0]['link']);
  
        this.progressbar=false;
        this.test=true;
        //console.log("here");
        this.router.navigate(['/card-chart']);
       
    });
    */
    });

  }

  getAutoCompleteInfo(value: string) {

    this.http.get('http://localhost:8000/getAutoComplete?search=' + value).subscribe((response) => {
      var parsed = JSON.parse(response.toString());
      console.log(parsed)
      //parse and put suggestions in suggestions array
      for (var i = 0; i < 5; i++) {
        if (parsed['predictions'][i])
          this.suggestions[i] = parsed['predictions'][i]['structured_formatting']['main_text']
        else
          break;
      }
    });
  }
}