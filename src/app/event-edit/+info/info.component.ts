import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../../models/event.service';
import { EventModel } from '../../models/event.model';
import { AlertService } from '../../alerts';

console.log('`Info` component loaded asynchronously');

@Component({
  selector: 'info',
  templateUrl: 'info.component.html',
  // styleUrls: [ './info.component.css' ],
})
export class InfoComponent implements OnInit {
  public event: EventModel = new EventModel();
  public minDate = new Date();

  constructor(
    private events: EventService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
    console.log('hello `Info` component');

    this.route.data.subscribe((data: { event: EventModel }) => {
      if (data.event) {
        this.event = data.event;
      } else {
        this.event = new EventModel();
      }

      if (!this.event.getId()) {
        // Set current location
        this.setCurrentLocation();
      }
    });
  }

  public saveEvent() {
    if (this.event.getId()) {
      this.events.updateEvent(this.event).then((event) => {
        this.event = event;
        this.alerts.alertSuccess('Event updated.');
      })
      .catch((err) => console.error(err));
    } else {
      this.events.saveEvent(this.event).then((event) => {
        this.event = event;
        this.alerts.alertSuccess('Event saved.');
      })
      .catch((err) => console.error(err));
    }
  }

  private setCurrentLocation() {
    if ('gelocation' in navigator) {
        // Support
        navigator.geolocation.getCurrentPosition((position) => {
          this.event.location.lat = position.coords.latitude;
          this.event.location.lng = position.coords.longitude;
          // this.zoom = 12;
        });
    } else {
        // Not supported so use defaults
        this.event.location.lat = 49.214073199999994;
        this.event.location.lng = -122.9649724;
    }
  }
}
