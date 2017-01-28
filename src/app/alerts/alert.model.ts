export class Alert {
  constructor(public type: string,
              public msg: string,
              public timeout: number,
              public dismissible: boolean = false
            ) { }
}
