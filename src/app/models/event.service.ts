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
        .then((response: Response): EventModel => {
          let resObj = JSON.parse(response.text());
          let resEvent = resObj.data;
          return this.makeEvent(resEvent);
        })
        .catch(this.handleError);
  }

  public publicEvents(): Promise<EventModel[]> {
    return this.http.get('/api/events')
      .toPromise()
      .then((response: Response): EventModel[] => {
        let resObj = JSON.parse(response.text());
        let resEvents = resObj.data;
        console.log(resEvents);

        return resEvents.map(this.makeEvent);
      })
      .catch(this.handleError);
  }

  public currentUserEvents(): Promise<EventModel[]> {
    return this.http.get('/api/events/' + this.auth.getUserId())
      .toPromise()
      .then((response: Response): EventModel[] => {
        let resObj = JSON.parse(response.text());
        let resEvents = resObj.data;

        return resEvents.map(this.makeEvent);
      })
      .catch(this.handleError);
  }

  private makeEvent(eventData): EventModel {
    return new EventModel(eventData.id, eventData.name, eventData.description,
      new Date(eventData.start), '', eventData.lat, eventData.lng, eventData.ownerId);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

}
