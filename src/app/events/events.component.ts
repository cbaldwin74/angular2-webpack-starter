import { Component, OnInit } from '@angular/core';
import { EventService } from '../models/event.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'events',
  templateUrl: 'events.component.html',
  // styleUrls: [ './events.component.css' ],
})
export class EventsComponent implements OnInit {
  public hosted: EventModel[] = [];
  public participating: EventModel[] = [];

  constructor(private events: EventService) {  }

  public ngOnInit() {
    this.events.currentUserEvents()
      .then((userEvents) => this.hosted = userEvents);
    this.participating = [];
  }
}
