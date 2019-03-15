import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-board',
  templateUrl: './event-board.component.html',
  styleUrls: ['./event-board.component.css']
})
export class EventBoardComponent implements OnInit {
  @Input() eventId: number;
  constructor() { }

  ngOnInit() {
  }

}
