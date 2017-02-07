import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TabsModule,
} from 'ng2-bootstrap';

import { routes } from './events.routes';
import { EventsComponent } from './events.component';

console.log('`Events` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    EventsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TabsModule.forRoot(),
  ],
})
export class EventsModule {
  public static routes = routes;
}
