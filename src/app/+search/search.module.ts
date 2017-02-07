import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DatepickerModule,
  TimepickerModule,
} from 'ng2-bootstrap';
import { routes } from './search.routes';
import { SearchComponent } from './search.component';
import { LocationFormModule } from '../components/location-form';

console.log('`Search` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    SearchComponent,
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
export class SearchModule {
  public static routes = routes;
}
