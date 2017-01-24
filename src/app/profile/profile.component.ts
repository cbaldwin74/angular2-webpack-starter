import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileModel } from './profile.model';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  public profile: ProfileModel;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {profile: ProfileModel}) => {
      this.profile = data.profile;
    });
  }

  public updateProfile() {
    return;
  }
}
