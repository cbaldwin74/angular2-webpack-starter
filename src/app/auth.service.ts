import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public redirectUrl: string;

  constructor(private http: Http) { }

  public login(email: string, password: string): Promise<any> {
    console.log('submitting login to server');
    return this.http.post('/auth/login', {username: email, password})
      .toPromise()
      .then((response) => {
        let reply = JSON.parse(response.text());
        localStorage.setItem('id_token', reply.token);
        return reply.token;
      })
      .catch(this.handleError);
  }

  public signup(firstname: string, lastname: string, email: string,
                password: string): Promise<any> {
    console.log('signing up new user');
    return this.http.post('/auth/signup', {firstname, lastname, email, password})
      .toPromise()
      .then((response) => {
        let reply = JSON.parse(response.text());
        localStorage.setItem('id_token', reply.token);
        return reply.token;
      })
      .catch(this.handleError);
  }

  public loggedIn() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('id_token');
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}
