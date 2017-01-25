import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
  // Set our default values
  public localState = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {}

  public signup(firstname, lastname, email, password) {
    console.log(firstname, lastname, email, password);
    this.authService.signup(firstname, lastname, email, password)
      .then((result) => {
        this.router.navigate([
          this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard']);
        this.authService.redirectUrl = undefined;
      })
      .catch((err) => console.log(err));
  }
}
