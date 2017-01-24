import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { ProfileModel } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(private http: AuthHttp) { }

  public getProfile(id: number): Promise<ProfileModel> {
    return Promise.resolve(new ProfileModel('Chris', 'Baldwin', 'cbaldwin@shaw.ca'));
  }
}
