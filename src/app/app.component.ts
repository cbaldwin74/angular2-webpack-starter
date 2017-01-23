/*
 * Angular 2 decorators and services
 */
import {
  AfterContentChecked,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { ButtonsModule } from './ng2-bootstrap';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

const SIDE_NAV_CLOSED_WIDTH = 40; // in pixels
const SIDE_NAV_OPEN_WIDTH = 200; // in pixels

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
export class AppComponent implements OnInit, AfterContentChecked {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/EventRunner';
  public open: boolean;
  public marginLeft: Number;

  constructor(
    public appState: AppState,
    private auth: AuthService,
    private router: Router
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.open = false;
    this.marginLeft = this.loggedIn() ? SIDE_NAV_CLOSED_WIDTH : 0;
  }

  public ngAfterContentChecked() {
    this.marginLeft = this.loggedIn() ? this.open ? 200 : SIDE_NAV_CLOSED_WIDTH : 0;
  }

  public loggedIn() {
    return this.auth.loggedIn();
  }

  public logout() {
    this.auth.logout();
    this.router.navigate([ '/login' ]);
    this.marginLeft = 0;
    this.open = false;
  }

  /*
   * Set the width of the side navigation to 200px and the left margin of the
   * page content to 200px
   */
  public openNav() {
    document.getElementById('mySidenav').style.width = SIDE_NAV_OPEN_WIDTH + 'px';
    this.marginLeft = SIDE_NAV_OPEN_WIDTH;
    this.open = true;
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  public closeNav() {
    this.open = false;
    document.getElementById('mySidenav').style.width = SIDE_NAV_CLOSED_WIDTH + 'px';
    this.marginLeft = SIDE_NAV_CLOSED_WIDTH;
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
