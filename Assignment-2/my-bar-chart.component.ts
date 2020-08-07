import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})

export class MyBarChartComponent implements OnInit {

  public barChartLabels;
  public barChartType;
  public barChartLegend;;
  public barChartData;
  public barChartOptions;

  public chartAttribute = "T";
  public parsed;

  constructor(private _dataService: DataServiceService) { }

  ngOnInit() {
    this.parsed = JSON.parse(this._dataService.data);
    var temp = [];
    var min = 99999;
    var max = 0;
    for (var i = 0; i < 24; i++) {
      temp[i] = this.parsed['hourly']['data'][i]['temperature'].toFixed();
      if (min > temp[i]) min = temp[i];
      if (max < temp[i]) max = temp[i];
    }

    this.barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.barChartData = [
      {
        data: temp,
        label: 'temperature',
        backgroundColor: '#93caed',
        borderColor: '#93caed',
        hoverBackgroundColor: '#93caed'
      }
    ];
    this.setBarChartOptions('Fahrenheit', (+min) - 5, (+max) + 5, 5);
  }

  setBarChartOptions(yLabelString: string, min: number, max: number, step: number) {

    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      legend: {
        onClick: (e) => e.stopPropagation()
      },
      scales: {
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time difference from current hour'
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: yLabelString
          },
          ticks: {
            max: max,
            min: min,
            stepSize: step
          }
        }]
      }
    };
  }

  optionChange() {
    var temp = []

    if (this.chartAttribute == "T") {
      var min = 99999;
      var max = 0;
      for (var i = 0; i < 24; i++) {
        temp[i] = this.parsed['hourly']['data'][i]['temperature'].toFixed();
        if (min > temp[i]) min = temp[i];
        if (max < temp[i]) max = temp[i];
      }

      this.barChartData = [
        {
          data: temp,
          label: 'temperature',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('Fahrenheit', Math.round(+min) - 5, Math.round(+max) + 5, 5);
    } else if (this.chartAttribute == "P") {
      var min = 99999;
      var max = 0;
      for (var i = 0; i < 24; i++) {
        temp[i] = this.parsed['hourly']['data'][i]['pressure']
        if (min > temp[i]) min = temp[i];
        if (max < temp[i]) max = temp[i];
      }

      this.barChartData = [
        {
          data: temp,
          label: 'pressure',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('Milibars', Math.round(+min) - 1, Math.round(+max) + 1, 1);
    } else if (this.chartAttribute == "H") {
      var min = 99999;
      for (var i = 0; i < 24; i++) {
        temp[i] = (+this.parsed['hourly']['data'][i]['humidity'])*100;
        if(min>temp[i]) min=temp[i];
      }

      this.barChartData = [
        {
          data: temp,
          label: 'humidity',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('\% Humidity', min-5, 100, 5);
    } else if (this.chartAttribute == "O") {
      var min = 99999;
      var max = 0;
      for (var i = 0; i < 24; i++) {
        temp[i] = this.parsed['hourly']['data'][i]['ozone'];
        if (min > temp[i]) min = temp[i];
        if (max < temp[i]) max = temp[i];
      }

      this.barChartData = [
        {
          data: temp,
          label: 'ozone',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('Dobson Units', Math.round(+min) - 5, Math.round(+max) + 5, 5);
    } else if (this.chartAttribute == "V") {
      for (var i = 0; i < 24; i++) {
        if (this.parsed['hourly']['data'][i]['visibility'] >= 10) temp[i] = 10
        else temp[i] = this.parsed['hourly']['data'][i]['visibility'];
      }
      this.barChartData = [
        {
          data: temp,
          label: 'visibility',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('Miles \(Maximum 10\)', 0, 11, 1);
    } else {
      var max = 0;
      for (var i = 0; i < 24; i++) {
        temp[i] = this.parsed['hourly']['data'][i]['windSpeed'];
        if (max < temp[i]) max = temp[i];
      }

      this.barChartData = [
        {
          data: temp,
          label: 'windSpeed',
          backgroundColor: '#93caed',
          borderColor: '#93caed',
          hoverBackgroundColor: '#93caed'
        }
      ];
      this.setBarChartOptions('Miles per Hour', 0, Math.round(+max) + 2, 2);
    }
  }
}

