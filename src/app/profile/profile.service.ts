import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Profile } from './profile';

@Injectable()
export class ProfileService {
  constructor(private http: AuthHttp) { }

  public getProfile(id: number): Promise<Profile> {
    return Promise.resolve(new Profile('Chris', 'Baldwin', 'cbaldwin@shaw.ca'));
  }
}
