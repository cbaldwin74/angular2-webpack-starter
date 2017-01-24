import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProfileModel } from './profile.model';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<ProfileModel> {
  constructor(private profiles: ProfileService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ProfileModel> {
    return this.profiles.getProfile(0).then((profile: ProfileModel) => {
      if (profile) {
        return profile;
      } else {
        this.router.navigate(['/dashboard']);
        return null;
      }
    });
  }
}
