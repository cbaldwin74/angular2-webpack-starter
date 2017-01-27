import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { EventModel } from '../models/event.model';
import { EventService } from '../models/event.service';

@Injectable()
export class EventResolver implements Resolve<EventModel> {
  constructor(private events: EventService, private router: Router,
              private location: Location) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<EventModel> {
    let id: number  = route.params['id'];
    console.log('Resolving event', id);

    if (id) {
      return this.events.getEvent(id).then((event: EventModel) => {
        if (event) {
          return event;
        } else {
          this.location.back();
          return null;
        }
      });
    } else {
      return Promise.resolve(new EventModel());
    }
  }
}
