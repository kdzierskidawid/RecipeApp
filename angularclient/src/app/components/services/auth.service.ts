import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../model/User';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  attemptAuth(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    console.log('attempAuth');
    return this.http.post<any>('http://localhost:8089/token/generate-token', credentials);
  }
}
