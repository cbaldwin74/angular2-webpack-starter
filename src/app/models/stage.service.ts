import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { StageModel } from './stage.model';
import { AuthService } from '../auth.service';
import { GeoLocationModel } from './geo-location.model';

@Injectable()
export class StageService {
  constructor(private http: AuthHttp,
              private auth: AuthService) { }

  public getStage(id: number): Promise<StageModel> {
    return this.http.get('/api/stage/' + id)
      .toPromise()
      .then((response: Response): StageModel => {
        return this.handleStageResponse(response);
      })
      .catch(this.handleError);
  }

  /**
   * Save a new stage.
   */
  public saveStage(stage: StageModel): Promise<StageModel> {
    stage.ownerId = this.auth.getUserId();

    return this.http.post('/api/stage', this.prepareStageObj(stage))
        .toPromise()
        .then((response: Response): StageModel => {
          return this.handleStageResponse(response);
        })
        .catch(this.handleError);
  }

  /**
   * Update and Stage
   */
  public updateStage(stage: StageModel): Promise<StageModel> {
    stage.ownerId = this.auth.getUserId();

    return this.http.put('/api/stage', this.prepareStageObj(stage))
        .toPromise()
        .then((response: Response): StageModel => {
          return this.handleStageResponse(response);
        })
        .catch(this.handleError);
  }

  public getStages(eventId: number): Promise<StageModel[]> {
    return this.http.get('/api/stages/' + eventId)
      .toPromise()
      .then((response: Response): StageModel[] => {
        return this.handleStageArrayResponse(response);
      })
      .catch(this.handleError);
  }

  public currentUserStages(): Promise<StageModel[]> {
    return this.http.get('/api/stages/' + this.auth.getUserId())
      .toPromise()
      .then((response: Response): StageModel[] => {
        return this.handleStageArrayResponse(response);
      })
      .catch(this.handleError);
  }

  private makeStage(stageData): StageModel {
    return new StageModel(stageData.id, stageData.name, stageData.description,
      new GeoLocationModel(stageData.lat, stageData.lng, ''),
      stageData.ownerId, stageData.eventId);
  }

  private handleStageResponse(response: Response): StageModel {
    let resObj = JSON.parse(response.text());
    let resStage = resObj.data;

    return this.makeStage(resStage);
  }

  private handleStageArrayResponse(response: Response): StageModel[] {
    let resObj = JSON.parse(response.text());
    let resStages = resObj.data;

    return resStages.map(this.makeStage);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

  private prepareStageObj(stage: StageModel) {
    return {
      id: stage.getId(),
      name: stage.name,
      description: stage.description,
      lat: stage.location.lat,
      lng: stage.location.lng,
      ownerId: stage.ownerId,
      eventId: stage.eventId
    };
  }
}
