import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './event-edit.routes';
import { EventEditComponent } from './event-edit.component';

console.log('`Event Edit` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    EventEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class EventEditModule {
  public static routes = routes;
}
