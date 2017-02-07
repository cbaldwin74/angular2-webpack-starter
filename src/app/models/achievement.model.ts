import { StageModel } from './stage.model';

export class AchievementModel {
  constructor(private id: number = null,
              public name: string = '',
              public description: string = '',
              public stages: StageModel[] = [],
              public ownerId: number = null,
              public eventId: number = null) { }

  public getId() {
    return this.id;
  }
}
