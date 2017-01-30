import { GeoLocationModel } from './geo-location.model';

export class StageModel {
  constructor(public name: string = '',
              public description: string = '',
              public location: GeoLocationModel = new GeoLocationModel()) { }
}
