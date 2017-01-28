import { Alert } from './alert.model';

const TIMEOUT: number = 15000;

export class AlertService {
  public alerts: Alert[];

  constructor() {
    this.alerts = [];
  }

  public alertSuccess(msg: string) {
    this.alerts.push(new Alert('success', msg, TIMEOUT, true));
  }

  public alertInfo(msg: string) {
    this.alerts.push(new Alert('info', msg, TIMEOUT));
  }
  public alertWarning(msg: string) {
    this.alerts.push(new Alert('warning', msg, TIMEOUT));
  }

  public alertError(msg: string) {
    this.alerts.push(new Alert('error', msg, TIMEOUT, true));
  }
}
