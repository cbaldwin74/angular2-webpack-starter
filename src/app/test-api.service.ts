import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class TestApiService {

    constructor(private http: Http) { }

    public testServer() {
        return this.http.get('/api/test');
    }
}
