import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stations } from '../interfaces/stations';
import { Etds } from '../interfaces/etds';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlStations = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=ZRR9-P2Q2-92KT-DWE9&json=y'
  private urlTimes = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=';
  private urlKey = '&key=ZRR9-P2Q2-92KT-DWE9&json=y';
  private stations;
  private times;
  private stationName: Stations[] = [];
  private stationTimes: Etds[] = [];
  
  constructor(private http: HttpClient) {
    this.getData();
  }
  getData() {
    this.stations = this.http.get(this.urlStations);
    this.stations.subscribe(
      x => {
        for (const s of x.root.stations.station) {
          const info: Stations = {
            name: s.name,
            abbr: s.abbr
          };
          this.stationName.push(info);
        }
        console.log(this.stationName);
      });
    }
    getTime(ABBR) {
      const fullURL = this.urlTimes + ABBR + this.urlKey;
      this.times = this.http.get(fullURL);
      console.log(fullURL)
      this.times.subscribe(
        x => {
        for (const s of x.root.station) {
          const info =  {
            name: s.name,
            abbr: s.abbr,
            etd: [],
            // estimate: []
          };
          for (const e of s.etd) {
            info.etd.push(e);
          };
          // for (const f of s.estimate) {
          //   info.estimate.push(f);
          // }
          this.stationTimes.push(info);
        }
        console.log(this.stationTimes);
      });
  }

  // --------------------non-http functions----------------- //
  sideMenu() {
    return this.stationName;
  }
  allTimes() {
    return this.stationTimes;
  }
}
