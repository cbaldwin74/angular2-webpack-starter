import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../models/event.service';
import { EventModel } from '../models/event.model';
import { GeoLocationModel } from '../models/geo-location.model';
import { AlertService } from '../alerts';

console.log('`Search` component loaded asynchronously');

@Component({
  selector: 'search',
  templateUrl: 'search.component.html',
  // styleUrls: [ './search.component.css' ],
})
export class SearchComponent implements OnInit {
  public searchName: string = '';
  public searchRadius: number = 0;
  public searchLocation: GeoLocationModel;
  public lastResults: EventModel[];

  constructor(
    private events: EventService,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
    console.log('hello `Search` component');

    this.searchLocation = new GeoLocationModel();
    this.lastResults = [];
    // Set current location
    this.setCurrentLocation();
  }

  public submitSearch() {
    this.events.searchEvents(this.searchName, this.searchLocation, this.searchRadius)
      .then((results: EventModel[]) => {
        this.lastResults = results;
      })
      .catch((error) => console.log(error));
  }

  public joinEvent(id: number) {
    console.log('Join Event', id);
  }

  private setCurrentLocation() {
    if ('gelocation' in navigator) {
        // Support
        navigator.geolocation.getCurrentPosition((position) => {
          this.searchLocation.lat = position.coords.latitude;
          this.searchLocation.lng = position.coords.longitude;
          // this.zoom = 12;
        });
    } else {
        // Not supported so use defaults
        this.searchLocation.lat = 49.214073199999994;
        this.searchLocation.lng = -122.9649724;
    }
  }
}
