import { GeoLocationModel } from './geo-location.model';

export class StageModel {
  constructor(private id: number = null,
              public name: string = '',
              public description: string = '',
              public location: GeoLocationModel = new GeoLocationModel(),
              public ownerId: number = null,
              public eventId: number = null) { }

  public getId(): number {
    return this.id;
  }
}
