import { EventEditComponent } from './event-edit.component';

export const routes = [
  { path: '', component: EventEditComponent, children: [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    // { path: '', component: EventEditComponent },
    { path: 'info', loadChildren: './+info#InfoModule' },
    { path: 'stages', loadChildren: './+stages#StagesModule' }
  ]},
];
