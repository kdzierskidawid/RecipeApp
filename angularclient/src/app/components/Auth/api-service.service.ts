import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../../model/User';

// tslint:disable
@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  baseUrl: string = 'http://localhost:8082/users/';
  redirectURL: string;

  login(credentials): Observable<any> {
    const body = new HttpParams()
      .set('username', credentials.email)
      .set('password', credentials.password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa('politechnika:politechnika'),
      'Content-type': 'application/x-www-form-urlencoded'
    };
    return this.http.post('http://localhost:8082/' + 'oauth/token', body, {headers});
  }

  userLoggedIn(): boolean {
    return localStorage.getItem('access_token') != null;
  }

  userCanAccessPageWithRoles(roles:string[]){
    const userRoles: string[] = JSON.parse(localStorage.getItem('userData')).roles;
    return roles != null && userRoles.some((role) => roles.indexOf(role) !== -1);
  }

  getUsers() {
    return this.http.get(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserRole(id: number) {
    return this.http.get(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'user/' + user.id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
