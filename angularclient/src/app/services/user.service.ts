import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {Recipe} from '../model/Recipe';


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


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userURL + 'all', {responseType: 'json'});
  }


  public getByEmail(email: string): Observable<User> {
    //const headers = {Authorization: sessionStorage.getItem('AuthToken')};
    console.log('user.service');
    return this.http.get<User>(this.userURL  + email, {responseType: 'json'});
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.userURL + 'getByEmail/' + email, {responseType: 'json'});
  }

  public checkIfUserExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.userURL + 'exists/' + email, {responseType: 'json'});
  }

  public checkIfUserIsActive(email: string): Observable<boolean> {
    return this.http.get<boolean>(this.userURL + 'isActive/' + email, {responseType: 'json'});
  }

  public register(user: User) {
    return this.http.post<User>(this.userURL + 'register', user);
  }

  public confirmRegistration(token: string): Observable<boolean>  {
    return this.http.get<boolean>(this.userURL + 'confirm/registrationConfirm?token=' + token);
  }

  public delete(user: User) {
    const httpOptions = {body: user, responseType: 'text' as 'json'};
    return this.http.delete(this.userURL + 'delete', httpOptions);
  }

  public sendPassword(password: string){
    return this.http.post<string>(this.userURL + 'getPassword/' + password, password);
  }

  public getUserById(userid: string): Observable<User>  {
    return this.http.get<User>(this.userURL + userid);
  }

  public checkPassword(user: User){
    return this.http.post<User>(this.userURL + 'checkPassword', user);
  }
}
