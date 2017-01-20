import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  // Set our default values
  public localState = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {}

  public login(email: string, password: string) {
    this.authService.login(email, password)
      .then((result) => this.router.navigate(['home']))
      .catch((err) => console.log(err));
  }
}
