/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { ButtonsModule } from './ng2-bootstrap';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/EventRunner';

  constructor(
    public appState: AppState,
    private auth: AuthService,
    private router: Router
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  public loggedIn() {
    return this.auth.loggedIn();
  }

  public logout() {
    this.auth.logout();
    this.router.navigate([ '/login' ]);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
