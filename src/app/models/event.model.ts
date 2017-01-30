import { GeoLocationModel } from './geo-location.model';

export class EventModel {
  constructor(private id: number = null,
              public name: string = '',
              public description: string = '',
              public start: Date = new Date(),
              public location: GeoLocationModel = new GeoLocationModel(),
              public ownerId: number = null) { }

  public getId(): number {
    return this.id;
  }
}
