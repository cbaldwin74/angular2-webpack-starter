import { EventEditComponent } from './event-edit.component';
import { EventResolver } from '../resolvers/event.resolver';

export const routes = [
  { path: '', children: [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    // { path: '', component: EventEditComponent },
    { path: 'info', loadChildren: './+info#InfoModule', resolve: { event: EventResolver } },
    { path: 'stages', loadChildren: './+stages#StagesModule' }
  ]},
];
