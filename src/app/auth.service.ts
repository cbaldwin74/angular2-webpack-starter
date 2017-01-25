import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  public redirectUrl: string;
  private jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }

  public login(email: string, password: string): Promise<any> {
    console.log('submitting login to server');
    return this.http.post('/auth/login', {username: email, password})
      .toPromise()
      .then((response) => {
        return this.handleTokenReply(response);
      })
      .catch(this.handleError);
  }

  public signup(firstname: string, lastname: string, email: string,
                password: string): Promise<any> {
    console.log('signing up new user');
    return this.http.post('/auth/signup', {firstname, lastname, email, password})
      .toPromise()
      .then((response) => {
        return this.handleTokenReply(response);
      })
      .catch(this.handleError);
  }

  public loggedIn() {
    return tokenNotExpired();
  }

  public logout() {
    localStorage.removeItem('id_token');
  }

  private handleTokenReply(response: Response): string {
    let reply = JSON.parse(response.text());
    localStorage.setItem('id_token', reply.token);

    return reply.token;
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }
}
