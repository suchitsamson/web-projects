import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { 
  }

 public data:string;
 public timezone:string;
 public city:string;
 public lat:string;
 public lon:string;
 public seal:string;
 public state:string;

 public rangeDisplay0:string[];
 public rangeDisplay1:string[];
 public rangeDisplay2:string[];
 public rangeDisplay3:string[];
 public rangeDisplay4:string[];
 public rangeDisplay5:string[];
 public rangeDisplay6:string[];
 public rangeDisplay7:string[];

 
//new Date(parsed['daily']['data'][4]['time']*1000).toLocaleDateString('en-US',{timeZone: parsed['timezone']})];
  sendMessage(message: string){
    console.log(message);
    this.data=message;
    var parsed=JSON.parse(this.data);
    console.log(parsed['timezone'])
    this.timezone=parsed['timezone'];
    this.lat=parsed['latitude'];
    this.lon=parsed['longitude'];
    this.rangeDisplay0=[parsed['daily']['data'][0]['temperatureLow'],
                      parsed['daily']['data'][0]['temperatureHigh'],
                      parsed['daily']['data'][0]['time']];
    this.rangeDisplay1=[parsed['daily']['data'][1]['temperatureLow'],
                      parsed['daily']['data'][1]['temperatureHigh'],
                      parsed['daily']['data'][1]['time']];
    this.rangeDisplay2=[parsed['daily']['data'][2]['temperatureLow'],
                      parsed['daily']['data'][2]['temperatureHigh'],
                      parsed['daily']['data'][2]['time']];
    this.rangeDisplay3=[parsed['daily']['data'][3]['temperatureLow'],
                      parsed['daily']['data'][3]['temperatureHigh'],
                      parsed['daily']['data'][3]['time']];
    this.rangeDisplay4=[parsed['daily']['data'][4]['temperatureLow'],
                      parsed['daily']['data'][4]['temperatureHigh'],
                      parsed['daily']['data'][4]['time']];
    this.rangeDisplay5=[parsed['daily']['data'][5]['temperatureLow'],
                      parsed['daily']['data'][5]['temperatureHigh'],
                      parsed['daily']['data'][5]['time']];
    this.rangeDisplay6=[parsed['daily']['data'][6]['temperatureLow'],
                      parsed['daily']['data'][6]['temperatureHigh'],
                      parsed['daily']['data'][6]['time']];
    this.rangeDisplay7=[parsed['daily']['data'][7]['temperatureLow'],
                      parsed['daily']['data'][7]['temperatureHigh'],
                      parsed['daily']['data'][7]['time']];
  }

  setCity(c:string){
    this.city=c;
  }

  setState(s:string){
    this.state=s;
  }

  setSeal(s:string){
    this.seal=s;
  }
}
