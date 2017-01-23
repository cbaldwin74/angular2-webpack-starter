import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Profile } from './profile';
import { ProfileService } from './profile.service';

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profiles: ProfileService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Profile> {
    return this.profiles.getProfile(0).then((profile: Profile) => {
      if (profile) {
        return profile;
      } else {
        this.router.navigate(['/dashboard']);
        return null;
      }
    });
  }
}
