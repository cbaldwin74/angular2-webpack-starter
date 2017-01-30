import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../models/event.service';
import { EventModel } from '../models/event.model';
import { StageModel } from '../models/stage.model';
import { AlertService } from '../alerts';

@Component({
  selector: 'event-edit',
  templateUrl: 'event-edit.component.html',
  styleUrls: [ './event-edit.component.css' ],
})
export class EventEditComponent implements OnInit {
  public event: EventModel = new EventModel();
  public minDate = new Date();

  constructor(
    private events: EventService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
  }
}
