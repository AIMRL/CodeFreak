import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-admin-event-home',
  templateUrl: './admin-event-home.component.html',
  styleUrls: ['./admin-event-home.component.css']
})
export class AdminEventHomeComponent implements OnInit {

  eventId: number;
  isId= false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (!isNullOrUndefined(this.eventId)) {
      this.isId = true;
    }
  }

}
