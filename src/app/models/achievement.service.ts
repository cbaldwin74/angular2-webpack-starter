import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../auth.service';
import { AchievementModel } from './achievement.model';

@Injectable()
export class AchievementService {
  constructor(private http: AuthHttp,
              private auth: AuthService) { }

  public getAchievement(id: number): Promise<AchievementModel> {
    return this.http.get('/api/achievement/' + id)
      .toPromise()
      .then((response: Response): AchievementModel => {
        return this.handleAchievementResponse(response);
      })
      .catch(this.handleError);
  }

  /**
   * Save a new achievement.
   */
  public saveAchievement(achievement: AchievementModel): Promise<AchievementModel> {
    achievement.ownerId = this.auth.getUserId();

    return this.http.post('/api/achievement', achievement)
        .toPromise()
        .then((response: Response): AchievementModel => {
          return this.handleAchievementResponse(response);
        })
        .catch(this.handleError);
  }

  /**
   * Update and Achievement
   */
  public updateAchievement(achievement: AchievementModel): Promise<AchievementModel> {
    achievement.ownerId = this.auth.getUserId();

    return this.http.put('/api/achievement', achievement)
        .toPromise()
        .then((response: Response): AchievementModel => {
          return this.handleAchievementResponse(response);
        })
        .catch(this.handleError);
  }

  public publicAchievements(): Promise<AchievementModel[]> {
    return this.http.get('/api/achievements')
      .toPromise()
      .then((response: Response): AchievementModel[] => {
        return this.handleAchievementArrayResponse(response);
      })
      .catch(this.handleError);
  }

  public currentUserAchievements(): Promise<AchievementModel[]> {
    return this.http.get('/api/achievements/' + this.auth.getUserId())
      .toPromise()
      .then((response: Response): AchievementModel[] => {
        return this.handleAchievementArrayResponse(response);
      })
      .catch(this.handleError);
  }

  private makeAchievement(achievementData): AchievementModel {
    return new AchievementModel(achievementData.id, achievementData.name, achievementData.description,
      achievementData.stages, achievementData.ownerId, achievementData.eventId);
  }

  private handleAchievementResponse(response: Response): AchievementModel {
    let resObj = JSON.parse(response.text());
    let resAchievement = resObj.data;

    return this.makeAchievement(resAchievement);
  }

  private handleAchievementArrayResponse(response: Response): AchievementModel[] {
    let resObj = JSON.parse(response.text());
    let resAchievements = resObj.data;

    return resAchievements.map(this.makeAchievement);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

  // private prepareAchievementObj(achievement: AchievementModel) {
  //   return {
  //     id: achievement.getId(),
  //     name: achievement.name,
  //     description: achievement.description,
  //     stages: achievement.stages,
  //     ownerId: achievement.ownerId,
  //     eventId: achievement.eventId
  //   };
  // }
}
