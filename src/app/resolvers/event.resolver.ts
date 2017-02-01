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
    let id: number  = this.findIdInRouteTree(route);

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

  private findIdInRouteTree(route: ActivatedRouteSnapshot): number {
    if (route.params['id']) {
      return route.params['id'];
    } else if (route.parent) {
      return this.findIdInRouteTree(route.parent);
    } else {
      return undefined;
    }
  }
}
