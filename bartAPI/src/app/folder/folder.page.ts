import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Etds } from '../interfaces/etds';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public routes = [];

  constructor(private activatedRoute: ActivatedRoute, private dService: DataService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.routes = this.dService.routeDeets();
  }
  parseETD() {
    parsed-etd
    for (const s of this.routes.etd) {
      const info =  {
        destination: s.name,
        abbrieviation: s.abbr,
        estimate: [],
      };

    }
  }

}
