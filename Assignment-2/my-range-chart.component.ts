import { Component, OnInit, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import * as CanvasJS from './canvasjs.min.js';
import { DataServiceService } from '../data-service.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-my-range-chart',
  templateUrl: './my-range-chart.component.html',
  styleUrls: ['./my-range-chart.component.css']
})


export class MyRangeChartComponent implements OnInit {

  public modalRef: BsModalRef;
  public point: string;

  public time: string;

  public displayTime: string;
  public displayCity: string;
  public displayTemperature: string;
  public displaySummary: string;

  public displayPrecipitation: string;
  public displayRain: string;
  public displayWindSpeed: string;
  public displayHumidity: string;
  public displayVisibility: string;

  public displayImage: string;
  
  @ViewChild("hiddenbutton", {static: true}) hiddenbutton: ElementRef;
  //this.hiddenbutton.nativeElement.textContent
  
  //public json='{"latitude":34.0322,"longitude":-118.2836,"timezone":"America/Los_Angeles","currently":{"time":1574150400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":58.53,"apparentTemperature":58.53,"dewPoint":48.34,"humidity":0.69,"pressure":1010.2,"windSpeed":3.97,"windGust":6.6,"windBearing":84,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":265.9},"hourly":{"summary":"Foggy overnight and in the morning.","icon":"fog","data":[{"time":1574150400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":58.53,"apparentTemperature":58.53,"dewPoint":48.34,"humidity":0.69,"pressure":1010.2,"windSpeed":3.97,"windGust":6.6,"windBearing":84,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":265.9},{"time":1574154000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":57.92,"apparentTemperature":57.92,"dewPoint":48.42,"humidity":0.71,"pressure":1009.5,"windSpeed":4.22,"windGust":7.36,"windBearing":80,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":266.2},{"time":1574157600,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":57.47,"apparentTemperature":57.47,"dewPoint":48.45,"humidity":0.72,"pressure":1009,"windSpeed":4.4,"windGust":8.18,"windBearing":78,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":266},{"time":1574161200,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":57.28,"apparentTemperature":57.28,"dewPoint":48.61,"humidity":0.73,"pressure":1008.6,"windSpeed":4.51,"windGust":8.95,"windBearing":80,"cloudCover":0,"uvIndex":0,"visibility":3.372,"ozone":265.8},{"time":1574164800,"summary":"Foggy","icon":"fog","precipIntensity":0,"precipProbability":0,"temperature":57.03,"apparentTemperature":57.03,"dewPoint":48.92,"humidity":0.74,"pressure":1008.3,"windSpeed":4.51,"windGust":9.12,"windBearing":79,"cloudCover":0,"uvIndex":0,"visibility":0.051,"ozone":265.7},{"time":1574168400,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":56.42,"apparentTemperature":56.42,"dewPoint":49.28,"humidity":0.77,"pressure":1008.5,"windSpeed":4.3,"windGust":8.22,"windBearing":69,"cloudCover":0.07,"uvIndex":0,"visibility":3.372,"ozone":265.9},{"time":1574172000,"summary":"Clear","icon":"clear-night","precipIntensity":0,"precipProbability":0,"temperature":55.65,"apparentTemperature":55.65,"dewPoint":49.54,"humidity":0.8,"pressure":1009.2,"windSpeed":3.98,"windGust":6.75,"windBearing":56,"cloudCover":0.16,"uvIndex":0,"visibility":10,"ozone":266.4},{"time":1574175600,"summary":"Clear","icon":"clear-day","precipIntensity":0,"precipProbability":0,"temperature":56.12,"apparentTemperature":56.12,"dewPoint":49.81,"humidity":0.79,"pressure":1009.5,"windSpeed":3.71,"windGust":5.56,"windBearing":56,"cloudCover":0.27,"uvIndex":0,"visibility":10,"ozone":266.9},{"time":1574179200,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":59.04,"apparentTemperature":59.04,"dewPoint":50.43,"humidity":0.73,"pressure":1009.6,"windSpeed":3.45,"windGust":4.84,"windBearing":77,"cloudCover":0.38,"uvIndex":1,"visibility":10,"ozone":267},{"time":1574182800,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0.0003,"precipProbability":0.01,"precipType":"rain","temperature":63.42,"apparentTemperature":63.42,"dewPoint":50.68,"humidity":0.63,"pressure":1009.6,"windSpeed":3.29,"windGust":4.42,"windBearing":120,"cloudCover":0.51,"uvIndex":2,"visibility":10,"ozone":266.9},{"time":1574186400,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0.0004,"precipProbability":0.01,"precipType":"rain","temperature":66.69,"apparentTemperature":66.69,"dewPoint":50.66,"humidity":0.56,"pressure":1009.4,"windSpeed":3.47,"windGust":4.64,"windBearing":161,"cloudCover":0.63,"uvIndex":3,"visibility":10,"ozone":267.6},{"time":1574190000,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0.0003,"precipProbability":0.01,"precipType":"rain","temperature":69.72,"apparentTemperature":69.72,"dewPoint":50.32,"humidity":0.5,"pressure":1008.6,"windSpeed":4.36,"windGust":5.76,"windBearing":188,"cloudCover":0.78,"uvIndex":3,"visibility":10,"ozone":269.5},{"time":1574193600,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":72.1,"apparentTemperature":72.1,"dewPoint":49.85,"humidity":0.45,"pressure":1007.8,"windSpeed":5.62,"windGust":7.52,"windBearing":210,"cloudCover":0.92,"uvIndex":3,"visibility":10,"ozone":272},{"time":1574197200,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":73.21,"apparentTemperature":73.21,"dewPoint":49.56,"humidity":0.43,"pressure":1006.8,"windSpeed":6.71,"windGust":9.52,"windBearing":225,"cloudCover":0.97,"uvIndex":2,"visibility":10,"ozone":274.2},{"time":1574200800,"summary":"Overcast","icon":"cloudy","precipIntensity":0,"precipProbability":0,"temperature":72.55,"apparentTemperature":72.55,"dewPoint":49.56,"humidity":0.44,"pressure":1006.4,"windSpeed":7.35,"windGust":11.62,"windBearing":237,"cloudCover":0.88,"uvIndex":2,"visibility":10,"ozone":275.6},{"time":1574204400,"summary":"Mostly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":71.17,"apparentTemperature":71.17,"dewPoint":49.44,"humidity":0.46,"pressure":1006.2,"windSpeed":7.79,"windGust":13.94,"windBearing":257,"cloudCover":0.71,"uvIndex":1,"visibility":10,"ozone":276.6},{"time":1574208000,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":69.19,"apparentTemperature":69.19,"dewPoint":49.09,"humidity":0.49,"pressure":1006.4,"windSpeed":8.27,"windGust":16.36,"windBearing":247,"cloudCover":0.52,"uvIndex":0,"visibility":10,"ozone":277.8},{"time":1574211600,"summary":"Partly Cloudy","icon":"partly-cloudy-night","precipIntensity":0.0002,"precipProbability":0.01,"precipType":"rain","temperature":67.29,"apparentTemperature":67.29,"dewPoint":48.11,"humidity":0.5,"pressure":1006.6,"windSpeed":9.07,"windGust":19.61,"windBearing":180,"cloudCover":0.34,"uvIndex":0,"visibility":10,"ozone":279.7},{"time":1574215200,"summary":"Clear","icon":"clear-night","precipIntensity":0.0006,"precipProbability":0.01,"precipType":"rain","temperature":64.44,"apparentTemperature":64.44,"dewPoint":46.81,"humidity":0.53,"pressure":1007.3,"windSpeed":9.93,"windGust":22.94,"windBearing":80,"cloudCover":0.14,"uvIndex":0,"visibility":10,"ozone":281.6},{"time":1574218800,"summary":"Clear","icon":"clear-night","precipIntensity":0.0009,"precipProbability":0.01,"precipType":"rain","temperature":62.51,"apparentTemperature":62.51,"dewPoint":45.94,"humidity":0.55,"pressure":1007.8,"windSpeed":10.14,"windGust":24.09,"windBearing":26,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":283},{"time":1574222400,"summary":"Clear","icon":"clear-night","precipIntensity":0.0008,"precipProbability":0.01,"precipType":"rain","temperature":61.68,"apparentTemperature":61.68,"dewPoint":46.48,"humidity":0.57,"pressure":1008.1,"windSpeed":9.11,"windGust":21.34,"windBearing":19,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":282.8},{"time":1574226000,"summary":"Clear","icon":"clear-night","precipIntensity":0.0005,"precipProbability":0.01,"precipType":"rain","temperature":61.47,"apparentTemperature":61.47,"dewPoint":47.75,"humidity":0.61,"pressure":1008.4,"windSpeed":7.35,"windGust":16.4,"windBearing":35,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":281.9},{"time":1574229600,"summary":"Clear","icon":"clear-night","precipIntensity":0.0003,"precipProbability":0.01,"precipType":"rain","temperature":61.09,"apparentTemperature":61.09,"dewPoint":48.5,"humidity":0.63,"pressure":1008.6,"windSpeed":5.83,"windGust":12.08,"windBearing":44,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":280.9},{"time":1574233200,"summary":"Clear","icon":"clear-night","precipIntensity":0.0003,"precipProbability":0.01,"precipType":"rain","temperature":60.09,"apparentTemperature":60.09,"dewPoint":48.24,"humidity":0.65,"pressure":1008.7,"windSpeed":4.94,"windGust":9.34,"windBearing":34,"cloudCover":0,"uvIndex":0,"visibility":10,"ozone":279.9}]},"daily":{"data":[{"time":1574150400,"summary":"Partly cloudy throughout the day.","icon":"partly-cloudy-day","sunriseTime":1574173860,"sunsetTime":1574210940,"moonPhase":0.76,"precipIntensity":0.0002,"precipIntensityMax":0.0009,"precipIntensityMaxError":0.0693,"precipIntensityMaxTime":1574219100,"precipProbability":0.01,"precipType":"rain","temperatureHigh":73.72,"temperatureHighError":5.84,"temperatureHighTime":1574197500,"temperatureLow":55.78,"temperatureLowError":5.84,"temperatureLowTime":1574252340,"apparentTemperatureHigh":73.22,"apparentTemperatureHighTime":1574197500,"apparentTemperatureLow":56.27,"apparentTemperatureLowTime":1574252340,"dewPoint":48.89,"humidity":0.61,"pressure":1008.2,"windSpeed":5.91,"windGust":24.15,"windGustTime":1574218260,"windBearing":72,"cloudCover":0.32,"uvIndex":3,"uvIndexTime":1574190900,"visibility":8.95,"ozone":272.7,"temperatureMin":55.13,"temperatureMinError":5.84,"temperatureMinTime":1574173020,"temperatureMax":73.72,"temperatureMaxError":5.84,"temperatureMaxTime":1574197500,"apparentTemperatureMin":55.62,"apparentTemperatureMinTime":1574173020,"apparentTemperatureMax":73.22,"apparentTemperatureMaxTime":1574197500}]},"flags":{"sources":["cmc","gfs","hrrr","icon","isd","madis","nam","sref"],"nearest-station":0.707,"units":"us"},"offset":-8}';

  constructor(private _dataService: DataServiceService, private modalService: BsModalService, private http: HttpClient) {

  }

  openModal(template: TemplateRef<any>) {

    if (this.point == '10') this.time = this._dataService.rangeDisplay7[2];
    else if (this.point == '20') this.time = this._dataService.rangeDisplay6[2];
    else if (this.point == '30') this.time = this._dataService.rangeDisplay5[2];
    else if (this.point == '40') this.time = this._dataService.rangeDisplay4[2];
    else if (this.point == '50') this.time = this._dataService.rangeDisplay3[2];
    else if (this.point == '60') this.time = this._dataService.rangeDisplay2[2];
    else if (this.point == '70') this.time = this._dataService.rangeDisplay1[2];
    else this.time = this._dataService.rangeDisplay0[2];

    var parsed = JSON.parse(this._dataService.data);

    var date = new Date(+this.getTime() * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    this.displayTime = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    this.displayCity = this._dataService.city;
    //alert(this.getTime());
    this.getRangeAPI(this._dataService.lat, this._dataService.lon, this.getTime());
    this.modalRef = this.modalService.show(template);
  }

  getTime(): any {
    return new Date((<HTMLInputElement>document.getElementById('hiddenbutton')).value).getTime() / 1000;
  }

  ngOnInit() {
    var date = new Date(+this._dataService.rangeDisplay0[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate0 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay1[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate1 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay2[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate2 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay3[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate3 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay4[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate4 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay5[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate5 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay6[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate6 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
    date = new Date(+this._dataService.rangeDisplay7[2] * 1000).toLocaleDateString('en-US', { timeZone: this._dataService.timezone });
    var newDate7 = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Weekly weather"
      },
      axisX: {
        title: "Days"
      },
      axisY: {
        includeZero: false,
        title: "Temperature in Farenheit",
        interval: 10
      },
      legend: {
        verticalAlign: "top"
      },
      data: [{
        type: "rangeBar",
        showInLegend: true,
        yValueFormatString: "#0.#",
        indexLabel: "{y[#index]}",
        legendText: "Day wise temperature range",
        toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
        color: '#93caed',
        click: onClick,
        dataPoints: [
          { x: 10, y: [Math.round(+this._dataService.rangeDisplay7[0]), Math.round(+this._dataService.rangeDisplay7[1])], label: newDate7 },
          { x: 20, y: [Math.round(+this._dataService.rangeDisplay6[0]), Math.round(+this._dataService.rangeDisplay6[1])], label: newDate6 },
          { x: 30, y: [Math.round(+this._dataService.rangeDisplay5[0]), Math.round(+this._dataService.rangeDisplay5[1])], label: newDate5 },
          { x: 40, y: [Math.round(+this._dataService.rangeDisplay4[0]), Math.round(+this._dataService.rangeDisplay4[1])], label: newDate4 },
          { x: 50, y: [Math.round(+this._dataService.rangeDisplay3[0]), Math.round(+this._dataService.rangeDisplay3[1])], label: newDate3 },
          { x: 60, y: [Math.round(+this._dataService.rangeDisplay2[0]), Math.round(+this._dataService.rangeDisplay2[1])], label: newDate2 },
          { x: 70, y: [Math.round(+this._dataService.rangeDisplay1[0]), Math.round(+this._dataService.rangeDisplay1[1])], label: newDate1 },
          { x: 80, y: [Math.round(+this._dataService.rangeDisplay0[0]), Math.round(+this._dataService.rangeDisplay0[1])], label: newDate0 }
        ]
      }]
    });
    chart.render();

    function onClick(e) {
      var date = e.dataPoint.label;
      var newVal = date.substring(3, 5) + "/" + date.substring(0, 2) + "/" + date.substring(6);
      
      //alert(this.hiddenbutton.nativeElement.textContent);
      (<HTMLInputElement>document.getElementById('hiddenbutton')).value = newVal;
      //this.hiddenbutton.nativeElement.textContent=newVal;
      //alert(this.hiddenbutton.nativeElement.textContent);
      //this.hiddenbutton.nativeElement.click();
      document.getElementById('hiddenbutton').click();
      //alert(this.hiddenbutton.nativeElement);
    }
  }

  ngAfterViewInit() {
    console.log(this.hiddenbutton.nativeElement.textContent); // mayo
  }

  getRangeAPI(latitude: string, longitude: string, time: string) {

    var header = new HttpHeaders();
    header.append('Content-Type', 'application/json');

    this.http.get('http://localhost:8000/getRange?latitude='+latitude+'&longitude='+longitude+'&time='+time).subscribe((response) => {
      console.log('3rd chart api');
      //console.log(response.toString());
      var parsed = JSON.parse(response.toString());

      this.displayTemperature = parsed['currently']['temperature'].toFixed();
      this.displaySummary = parsed['currently']['summary'];
      this.displayPrecipitation = parsed['currently']['precipIntensity'];
      this.displayRain = parsed['currently']['precipProbability'];
      this.displayWindSpeed = parsed['currently']['windSpeed'];
      this.displayHumidity = parsed['currently']['humidity'];
      this.displayVisibility = parsed['currently']['visibility'];

      var icons = new Array()
      icons["clear-day"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
      icons["clear-night"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
      icons["rain"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
      icons["snow"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
      icons["sleet"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png";
      icons["wind"] = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png";
      icons["fog"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
      icons["cloudy"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
      icons["partly-cloudy-day"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
      icons["partly-cloudy-night"] = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";

      this.displayImage = icons[parsed['currently']['icon']];

      console.log(this.displayTime);
      console.log(this.displayCity);
      console.log(this.displayTemperature);
      console.log(this.displaySummary);
      console.log(this.displayPrecipitation);
      console.log(this.displayRain);
      console.log(this.displayWindSpeed);
      console.log(this.displayHumidity);
      console.log(this.displayVisibility);


      if (!this.displaySummary) this.displaySummary = "N/A";
      alert(this.displayPrecipitation)
      if (!this.displayPrecipitation) {
        if (this.displayPrecipitation != '0')
          this.displayPrecipitation = "N/A";
      }
      else this.displayPrecipitation = (+this.displayPrecipitation).toFixed(2);
      if (!this.displayRain) {
        if (this.displayRain != '0')
          this.displayRain = "N/A";
      }
      else this.displayRain = Math.round(+this.displayRain * 100).toString();
      if (!this.displayWindSpeed) {
        if (this.displayWindSpeed != '0')
          this.displayWindSpeed = "N/A";
      }
      else this.displayWindSpeed = (+this.displayWindSpeed).toFixed(2);
      if (!this.displayHumidity) {
        if (this.displayHumidity != '0')
          this.displayHumidity = "N/A";
      }
      else this.displayHumidity = Math.round(+this.displayHumidity * 100).toString();
      if (!this.displayVisibility) {
        if (this.displayVisibility != '0')
          this.displayVisibility = "N/A";
      }
      else this.displayVisibility = this.displayVisibility;
    });
  }

}

//{ x: 10, y:[this._dataService.rangeDisplay7[0], this._dataService.rangeDisplay7[1]], label: this._dataService.rangeDisplay7[2] },