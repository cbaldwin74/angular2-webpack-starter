import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './stages.routes';
import { StagesComponent } from './stages.component';
import { LocationFormModule } from '../../components/location-form';

console.log('`Stages` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    StagesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LocationFormModule,
  ],
})
export class StagesModule {
  public static routes = routes;
}
