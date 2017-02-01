import { StagesComponent } from './stages.component';
import { EventResolver } from '../../resolvers/event.resolver';

export const routes = [
  { path: '', component: StagesComponent,  pathMatch: 'full', resolve: { event: EventResolver } },
];
