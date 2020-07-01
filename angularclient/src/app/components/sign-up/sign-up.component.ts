import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;
  loading = true;

  constructor(private userService: UserService,
              private router: Router, private toastr: ToastrService) {
    this.user = new User(null, null, null, null, null, null, null, false);
  }

  ngOnInit(): void {
  }

  register(){

    this.userService.checkIfUserExists(this.user.email).subscribe(exists=>{
      if(exists){
       this.toastr.error('Użytkownik o podanym emailu już istnieje!!');
      }
      else{
        if(this.checkEmail() && this.checkFirstame && this.checkSurname()){
          this.user.role = 'ROLE_USER';
          this.userService.register(this.user).subscribe(
              result => {
                //this.toast.success('Zarejestrowano pomyślnie. Sprawdź email!');
                this.loading = false;
                console.log('Response' + result);
                this.toastr.success('Stworzono konto. Sprawdź pocztę i aktywuj konto!');
              },
              error => console.log('Error' + error));
        }

      }
    });

  }

  showError() {
  }

  accountCreated() {
    this.router.navigate(['']);
  }

  checkEmail() {
    const numbers = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;

    if (numbers.test(this.user.email)) {
      return true;
    } else if (this.user.email === null) {
      this.toastr.error('Nie podano emaila!');
      return false;
    } else {
      this.toastr.error('Podano błędny format emaila');
      return false;
    }
  }

  checkFirstame() {
    const numbers = /^[a-zA-Z\s]+/;

    if (numbers.test(this.user.firstname)) {
      return true;
    } else if (this.user.firstname === null) {
      this.toastr.error('Nie podano imienia');
      return false;
    } else {
      this.toastr.error('Użyto niedopuszczalnych znaków');
      return false;
    }
  }

  checkSurname() {
    const numbers = /^[a-zA-Z\s]+/;

    if (numbers.test(this.user.surname)) {
      return true;
    } else if (this.user.surname === null) {
      this.toastr.error('Nie podano nazwiska');
      return false;
    } else {
      this.toastr.error('Użyto niedopuszczalnych znaków');
      return false;
    }
  }

}
