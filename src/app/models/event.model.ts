import { GeoLocationModel } from './geo-location.model';

export class EventModel {
  constructor(private id: number = null,
              public name: string = '',
              public description: string = '',
              public start: Date = new Date(),
              public location: GeoLocationModel = new GeoLocationModel(),
              // public lat: number = 49.214073199999994,
              // public lng: number = -122.9649724,
              public ownerId: number = null) { }

  public getId(): number {
    return this.id;
  }
}
