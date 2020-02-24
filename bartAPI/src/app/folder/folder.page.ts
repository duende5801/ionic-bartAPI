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
  public times: Etds[] = [];

  constructor(private activatedRoute: ActivatedRoute, private dService: DataService) { }

  ngOnInit() {
    //this.times = this.dService.getTime(this.folder);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
