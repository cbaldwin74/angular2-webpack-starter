import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { EventModel } from './event.model';

@Injectable()
export class EventService {
  constructor(private http: AuthHttp) { }

  public getEvent(id: number): Promise<EventModel> {
    return Promise.resolve(new EventModel(1, 'TEst Event', '', new Date(), '',
      49.214073199999994, -122.9649724));
  }

  public saveEvent(event: EventModel): Promise<EventModel> {
    return Promise.resolve(new EventModel(1, event.name, event.description,
      event.start, event.location, event.lat, event.lng));
  }
}
