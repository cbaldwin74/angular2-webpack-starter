import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DatepickerModule,
  TimepickerModule,
} from 'ng2-bootstrap';
import { routes } from './info.routes';
import { InfoComponent } from './info.component';
import { LocationFormModule } from '../../components/location-form';

console.log('`Info` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    InfoComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    LocationFormModule,
  ],
})
export class InfoModule {
  public static routes = routes;
}
