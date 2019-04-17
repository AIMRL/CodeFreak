import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../AppSetting';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  logoPath = AppSettings.logoPath;
  team = AppSettings.teamImagesBaseUrl;
  constructor() { }

  ngOnInit() {
  }

}
