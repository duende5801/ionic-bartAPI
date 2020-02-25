import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

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
  classBG() {
    for (let i = 0; i<10; i++){
      if (i % 2 === 0){
        return 'grey'
      } else{
        return 'white'
      }
    }
  }
}
