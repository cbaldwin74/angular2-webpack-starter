import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})
export class DashboardComponent implements OnInit {
  public open: boolean;
  public hosted: Object[];
  public participating: Object[];
  
  constructor(private http: AuthHttp) {  }

  ngOnInit() {
    this.open = false;
    this.hosted = [];
    this.participating = [];
  }

  /*
   * Set the width of the side navigation to 250px and the left margin of the
   * page content to 250px
   */
  public openNav() {
    document.getElementById('mySidenav').style.width = '200px';
    document.getElementById('main').style.marginLeft = '200px';
    this.open = true;
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
  public closeNav() {
    this.open = false;
    document.getElementById('mySidenav').style.width = '50px';
    document.getElementById('main').style.marginLeft = '50px';
  }
}
