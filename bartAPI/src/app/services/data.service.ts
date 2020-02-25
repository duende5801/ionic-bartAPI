import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stations } from '../interfaces/stations';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private urlStations = 'https://api.bart.gov/api/stn.aspx?cmd=stns&key=ZRR9-P2Q2-92KT-DWE9&json=y';
  private urlETD = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig=';
  private urlKey = '&key=ZRR9-P2Q2-92KT-DWE9&json=y';
  private stations;
  private times;
  private stationName: Stations[] = [];
  private routeTimes = [];

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
    getRoutes(ABBR) {
      this.routeTimes = [];
      const fullURL = this.urlETD + ABBR + this.urlKey;
      this.times = this.http.get(fullURL);
      console.log(fullURL);
      this.times.subscribe(
        x => {
        for (const s of x.root.station[0].etd) {
          let info = {
            name: s.destination,
            estimate: []
          }
          for (const j of s.estimate) {
            let newObj = {
              minutes: j.minutes,
              platform: j.platform
            }
            info.estimate.push(newObj);
             
            }
            this.routeTimes.push(info);
          }
        console.log(this.routeTimes);
      });
  }
  //   getRoutes2(ABBR) {
  //     const fullURL = this.urlETD + ABBR + this.urlKey;
  //     this.times = this.http.get(fullURL);
  //     console.log(fullURL);
  //     this.times.subscribe(
  //       x => {
  //         for (const p of x.root.station.etd) {
  //           const info = {
  //             destination: p.destination,
  //             abbrieviation: p.abbrieviation,
  //             estimate: []
  //           };
  //           this.routeTimes.shift();
  //           this.routeTimes.push(info);
  //         }
  //         console.log(this.routeTimes);
  //       });
  // }

  // --------------------non-http functions----------------- //
  sideMenu(): Stations[] {
    return this.stationName;
  }
  routeDeets() {
    return this.routeTimes;
  }
}
