import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthService {

  active: boolean;
  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) {
    this.active = false;
  }

  attemptAuth(email: string, password: string): Observable<any> {
    const credentials = {email: email, password: password};
    console.log('attempAuth');
    return this.http.post<any>('http://localhost:8089/token/generate-token', credentials);
  }

  userLoggedIn(): boolean {
    return sessionStorage.getItem('AuthToken') !== null;
  }

  userCanAccessPageWithRoles(role:string){
    return role != null && role === 'ROLE_MODERATOR';
  }

  isModerator(){
    if(JSON.parse(localStorage.getItem('user')) !==null){
      const userRole = JSON.parse(localStorage.getItem('user')).role;
      if(this.userLoggedIn && userRole==='ROLE_MODERATOR'){
        return true;
      }
    }
    else{
      return false;
    }
  }

  isAdmin(){
    if(JSON.parse(localStorage.getItem('user')) !==null){
      const userRole = JSON.parse(localStorage.getItem('user')).role;
      if(this.userLoggedIn && userRole==='ROLE_ADMIN'){
        return true;
      }
    }
    else{
      return false;
    }
  }

  isUserActive(){
      this.active = JSON.parse(localStorage.getItem('user')).active;
      if(this.active===true){
        return true;
    }
    else{
      this.toast.error('Konto nie zostało aktywowane. Sprawdź swój email!')
      return false;
    }
  }
}
