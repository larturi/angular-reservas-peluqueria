import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(infoLogin: any): Observable<boolean> {

    const headers = new HttpHeaders();
    headers.set('Content-type', 'aplication/json');

    const url = 'https://bookingapp-5456d.firebaseio.com/users.json';

    return this.http.get<boolean>(url, {headers}).pipe(
      map (users => {
        return _.find(users, u => u.user === infoLogin.user && u.pass == infoLogin.pass);
      })
    );

  }

  isAuthenticated() {
     return localStorage.getItem('logged');
  }

}
