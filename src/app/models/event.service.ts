import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { EventModel } from './event.model';
import { AuthService } from '../auth.service';

@Injectable()
export class EventService {
  constructor(private http: AuthHttp,
              private auth: AuthService) { }

  public getEvent(id: number): Promise<EventModel> {
    return Promise.resolve(new EventModel(1, 'TEst Event', '', new Date(), '',
      49.214073199999994, -122.9649724, 1));
  }

  public saveEvent(event: EventModel): Promise<EventModel> {
    event.ownerId = this.auth.getUserId();

    return this.http.post('/api/event', event)
        .toPromise()
        .then((response: Response) => {
          let resObj = JSON.parse(response.text());
          let resEvent = resObj.data;
          return new EventModel(resEvent.id, resEvent.name, resEvent.description,
            new Date(resEvent.start), '', resEvent.lat, resEvent.lng, resEvent.ownerId);
        })
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
