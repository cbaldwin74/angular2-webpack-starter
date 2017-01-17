import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TestApiService {

    constructor(private http: Http) { }

    public testServer(): Promise<string> {
        return this.http.get('/api/test')
            .toPromise()
            .then((response) => response.text())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
