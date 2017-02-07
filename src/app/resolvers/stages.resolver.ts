import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { StageModel } from '../models/stage.model';
import { StageService } from '../models/stage.service';

@Injectable()
export class StagesResolver implements Resolve<StageModel[]> {
  constructor(private events: StageService, private router: Router,
              private location: Location) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<StageModel[]> {
    let id: number  = this.findIdInRouteTree(route);

    if (id) {
      return this.events.getStages(id).then((stages: StageModel[]) => {
        if (event) {
          return stages;
        } else {
          return [];
        }
      });
    } else {
      return Promise.resolve([]);
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
