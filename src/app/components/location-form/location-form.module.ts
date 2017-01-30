import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from 'angular2-google-maps/core';

import { LocationFormComponent } from './location-form.component';

@NgModule({
  declarations: [
    LocationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
  ],
  exports: [
    LocationFormComponent,
    AgmCoreModule,
  ]
})
export class LocationFormModule {

}
