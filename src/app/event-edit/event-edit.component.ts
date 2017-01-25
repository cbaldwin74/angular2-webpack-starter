import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import {  FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';

import { EventService } from '../models/event.service';
import { EventModel } from '../models/event.model';

@Component({
  selector: 'event-edit',
  templateUrl: 'event-edit.component.html',
  styleUrls: [ './event-edit.component.css' ],
})
export class EventEditComponent implements OnInit {
  public event: EventModel = new EventModel();
  public zoom: number = 4;
  public searchControl: FormControl;
  public minDate = new Date();

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private events: EventService
  ) { }

  public ngOnInit() {
    // Create search FormControl
    this.searchControl = new FormControl();

    // Set current location
    this.setCurrentLocation();

    // Load Places autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ['address', 'establishment']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // Get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // Verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Set lat, long, name, and zoom
          this.event.lat = place.geometry.location.lat();
          this.event.lng = place.geometry.location.lng();
          this.event.location = place.name;
          this.zoom = 12;
        });
      });
    });
  }

  public saveEvent() {
    this.events.saveEvent(this.event).then((event) => {
      this.event = event;
    })
    .catch((err) => console.error(err));
  }

  public markerDragEnded(event) {
    this.updateStartLocation(event.coords.lat, event.coords.lng);
  }

  public mapClicked(event) {
    this.updateStartLocation(event.coords.lat, event.coords.lng);
  }

  private updateStartLocation(lat: number, lng: number) {
    this.event.lat = lat;
    this.event.lng = lng;
    this.searchControl.setValue(null);
  }

  private setCurrentLocation() {
    if ('gelocation' in navigator) {
        // Support
        navigator.geolocation.getCurrentPosition((position) => {
          this.event.lat = position.coords.latitude;
          this.event.lng = position.coords.longitude;
          this.zoom = 12;
        });
    } else {
        // Not supported so use defaults
        this.event.lat = 49.214073199999994;
        this.event.lng = -122.9649724;
    }
  }
}
