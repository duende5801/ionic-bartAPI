import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Stations } from '../interfaces/stations';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

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
  public sched;

  constructor(private activatedRoute: ActivatedRoute, private dService: DataService, public modalController: ModalController) { }

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
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        sched: this.routes
      }
    });
    return await modal.present().then(_=>{
      this.sched;
    })
  }}
