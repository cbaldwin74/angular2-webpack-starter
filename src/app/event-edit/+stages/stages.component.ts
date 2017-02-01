import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { StageService } from '../../models/stage.service';
import { EventModel } from '../../models/event.model';
import { StageModel } from '../../models/stage.model';
import { AlertService } from '../../alerts';

console.log('`Stages` bundle loaded asynchronously');

@Component({
  selector: 'stages',
  templateUrl: 'stages.component.html',
  // styleUrls: [ 'stages.component.css' ],
})
export class StagesComponent implements OnInit {
  public stage: StageModel = new StageModel();
  public stageList: StageModel[] = [];
  public eventId: number = null;

  constructor(
    private stages: StageService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
    console.log('hello `Stages` component');

    this.route.data.subscribe((data: { event: EventModel }) => {
      if (data.event) {
        this.eventId = data.event.getId();
        this.stage.eventId = this.eventId;

        this.stages.getStages(this.eventId).then((stages: StageModel[]) => {
          this.stageList = stages;
        });
      }
    });
  }

  public saveStage() {
    if (this.stage.getId()) {
      this.stages.updateStage(this.stage).then((savedStage: StageModel) => {
        this.alerts.alertSuccess('Stage updated.');
      })
      .catch((err) => console.error(err));
    } else {
      this.stages.saveStage(this.stage).then((savedStage: StageModel) => {
        this.stageList.push(savedStage);
        this.stage = new StageModel();
        this.stage.eventId = this.eventId;
      })
      .catch((err) => console.error(err));
    }
  }
}
