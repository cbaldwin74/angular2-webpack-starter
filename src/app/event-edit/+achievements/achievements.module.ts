import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SortableModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import { routes } from './achievements.routes';
import { AchievementsComponent } from './achievements.component';

console.log('`Achievements` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    AchievementsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SortableModule.forRoot(),
  ],
})
export class AchievementsModule {
  public static routes = routes;
}
