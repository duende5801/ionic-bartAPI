import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Stations } from '../interfaces/stations';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public routes = [];
  stationNames: Stations[] = [];
  public stationName;
  public streetName;
  public city;

  constructor(private activatedRoute: ActivatedRoute, private dService: DataService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.routes = this.dService.routeDeets();
    this.stationNames = this.dService.sideMenu();
    this.getAddress();
  }
  getAddress() {
    for (const s of this.stationNames) {
      if (s.abbr === this.folder) {
        this.stationName = s.name;
        this.streetName = s.address;
        this.city = s.city;
      }
    }
  }
}
