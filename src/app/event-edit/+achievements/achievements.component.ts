import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { AchievementService } from '../../models/achievement.service';
import { StageService } from '../../models/stage.service';
import { AchievementModel } from '../../models/achievement.model';
import { EventModel } from '../../models/event.model';
import { StageModel } from '../../models/stage.model';
import { AlertService } from '../../alerts';

console.log('`Achievements` component loaded asynchronously');

@Component({
  selector: 'achievements',
  templateUrl: 'achievements.component.html',
  styleUrls: [ './achievements.component.css' ],
})
export class AchievementsComponent implements OnInit {
  public achievement: AchievementModel;
  public selectableStageList: StageModel[];
  public selectedStageList: StageModel[];
  // public event: EventModel;
  public achievementList: AchievementModel[];
  private eventId: number;

  constructor(
    private achievements: AchievementService,
    private stages: StageService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
    console.log('hello `Achievements` component');

    let filterStages = (stage: StageModel) => {
      if (this.achievement.stages.find((s: StageModel) => {
        return s.getId() === stage.getId();
      })) {
        console.log('selected');
        this.selectedStageList.push(stage);
      } else {
        console.log('selectable');
        this.selectableStageList.push(stage);
        console.log(this.selectableStageList);
      }
    };

    this.achievement = new AchievementModel();
    this.selectableStageList = [];
    this.selectedStageList = [];
    this.route.data.subscribe((data: { event: EventModel }) => {
      if (data.event) {
        this.eventId = data.event.getId();
      }
    });

    this.route.data.subscribe((data: { stages: StageModel[] }) => {
      if (data.stages) {
        data.stages.forEach(filterStages);
      }
    });
  }

  public saveAchievement() {
    this.achievement.stages = this.selectedStageList;
    if (this.achievement.getId()) {
      this.achievements.updateAchievement(this.achievement).then((achievement) => {
        this.achievement = achievement;
        this.alerts.alertSuccess('Achievement updated.');
      })
      .catch((err) => console.error(err));
    } else {
      this.achievements.saveAchievement(this.achievement).then((achievement) => {
        this.achievement = achievement;
        this.alerts.alertSuccess('Achievement saved.');
      })
      .catch((err) => console.error(err));
    }
  }
}
