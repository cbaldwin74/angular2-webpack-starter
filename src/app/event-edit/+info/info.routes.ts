import { InfoComponent } from './info.component';
import { EventResolver } from '../../resolvers/event.resolver';

export const routes = [
  { path: '', component: InfoComponent,  pathMatch: 'full', resolve: { event: EventResolver } },
];
