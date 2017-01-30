import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { EventService } from '../../models/event.service';
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

  constructor(
    private events: EventService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  public ngOnInit() {
    console.log('hello `Stages` component');
  }

  public saveStage() {
    console.log(this.stage);
  }
}
