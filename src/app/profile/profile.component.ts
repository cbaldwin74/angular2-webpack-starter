import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from './profile';

@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent implements OnInit {
  public profile: Profile;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {profile: Profile}) => {
      this.profile = data.profile;
    });
  }

  public updateProfile() {
    return;
  }
}
