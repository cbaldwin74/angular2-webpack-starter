import { AchievementsComponent } from './achievements.component';
import { EventResolver } from '../../resolvers/event.resolver';
import { StagesResolver } from '../../resolvers/stages.resolver';

export const routes = [
  { path: '', component: AchievementsComponent,  pathMatch: 'full',
    resolve: { event: EventResolver, stages: StagesResolver } },
];
