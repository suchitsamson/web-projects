import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-my-card-chart',
  templateUrl: './my-card-chart.component.html',
  styleUrls: ['./my-card-chart.component.css']
})
export class MyCardChartComponent implements OnInit {

  public city: string;
  public timezone: string;
  public temperature: string;
  public summary: string;
  public humidity: string;
  public pressure: string;
  public windspeed: string;
  public visibility: string;
  public cloudcover: string;
  public ozone: string;

  public displaytimezone: boolean;
  public displaytemperature: boolean;
  public displaysummary: boolean;
  public displayhumidity: boolean;
  public displaypressure: boolean;
  public displaywindspeed: boolean;
  public displayvisibility: boolean;
  public displaycloudcover: boolean;
  public displayozone: boolean;

  public seal: string;

  constructor(private _dataService: DataServiceService) {

    this.displaytimezone = true;
    this.displaytemperature = true;
    this.displaysummary = true;
    this.displayhumidity = true;
    this.displaypressure = true;
    this.displaywindspeed = true;
    this.displayvisibility = true;
    this.displaycloudcover = true;
    this.displayozone = true;
  }

  ngOnInit() {

    console.log('2nd chart api');
    console.log(this._dataService.data);
    var parsed = JSON.parse(this._dataService.data);
    this.seal = this._dataService.seal;
    this.city = this._dataService.city;
    this.timezone = parsed['timezone'];
    this.temperature = parsed['currently']['temperature'].toFixed();
    this.summary = parsed['currently']['summary'];
    this.humidity = parsed['currently']['humidity'];
    this.pressure = parsed['currently']['pressure'];
    this.windspeed = parsed['currently']['windSpeed'];
    this.visibility = parsed['currently']['visibility'];
    this.cloudcover = parsed['currently']['cloudCover'];
    this.ozone = parsed['currently']['ozone'];


    if (+this.humidity == 0) this.displayhumidity = false;
    if (+this.pressure == 0) this.displaypressure = false;
    if (+this.windspeed == 0) this.displaywindspeed = false;
    if (+this.visibility == 0) this.displayvisibility = false;
    if (+this.cloudcover == 0) this.displaycloudcover = false;
    if (+this.ozone == 0) this.displayozone = false;

  }

}
