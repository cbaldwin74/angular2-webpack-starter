import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  public login(email: string, password: string): Promise<any> {
    console.log('submitting login to server');
    return this.http.post('/auth/login', {email, password})
      .toPromise()
      .then((response) => response.text())
      .catch(this.handleError);
  }

  public signup(firstname: string, lastname: string, email: string,
                password: string): Promise<any> {
    console.log('signing up new user');
    return Promise.resolve(email);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}
