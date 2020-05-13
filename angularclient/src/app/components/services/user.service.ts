import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../model/User';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private readonly userURL: string;


  constructor(private http: HttpClient) {
    this.userURL = 'http://localhost:8089/users/';
  }

  public save(user: User) {
    console.log('user.service');
    return this.http.post<User>(this.userURL + 'add', user);
  }

  public getByEmail(email: string): Observable<User> {
    console.log('user.service');
    return this.http.get<User>(this.userURL + 'getByEmail/' + email);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.userURL + 'byEmail/' + email, {responseType: 'json'});
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.userURL + 'exists/' + email, {responseType: 'json'});
  }

  public register(user: User) {
    return this.http.post<User>(this.userURL + 'register', user);
  }

  public confirmRegistration(token: string): Observable<boolean>  {
    return this.http.get<boolean>(this.userURL + 'confirm/registrationConfirm?token=' + token);
  }

}
