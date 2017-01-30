import {
  Component,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { GeoLocationModel } from '../../models/geo-location.model';

@Component({
  selector: 'location-form',
  templateUrl: 'location-form.component.html',
  styleUrls: [ './location-form.component.css' ],
})
export class LocationFormComponent implements OnInit {
  @Input()
  public locationId: string;
  @Input()
  public location: GeoLocationModel;
  @Input()
  public label: string;
  public searchControl: FormControl;
  public zoom: number = 4;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  public ngOnInit() {
    // Create search FormControl
    this.searchControl = new FormControl();

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

          if (this.location) {
            // Set lat, long, name, and zoom
            this.location.lat = place.geometry.location.lat();
            this.location.lng = place.geometry.location.lng();
            this.location.name = place.name;
          }
          this.zoom = 12;
        });
      });
    });
  }

  public markerDragEnded(event) {
    this.updateLocation(event.coords.lat, event.coords.lng);
  }

  public mapClicked(event) {
    this.updateLocation(event.coords.lat, event.coords.lng);
  }

  private updateLocation(lat: number, lng: number) {
    this.location.lat = lat;
    this.location.lng = lng;
    this.searchControl.setValue(null);
  }
}
