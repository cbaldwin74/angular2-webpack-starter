import { Component, OnInit } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
})
export class DashboardComponent implements OnInit {
  public hosted: Object[];
  public participating: Object[];

  constructor(private http: AuthHttp) {  }

  ngOnInit() {
    this.hosted = [];
    this.participating = [];
  }
}
