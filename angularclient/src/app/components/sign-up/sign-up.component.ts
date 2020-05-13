import { Component, OnInit } from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../services/user.service';
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
              private router: Router) {
    this.user = new User(null, null, null, null, null, null, null, false);
  }

  ngOnInit(): void {
  }

  register(){
/*    console.log('Register');
    console.log(this.user);
    this.userService.save(this.user).subscribe(
      result => {
        console.log('dodano');

      },
      error => {
        console.log('błąd');
        console.log(error);
      }
    );*/
   /* this.userService.checkIfUserExists(this.user.email).subscribe(
      response => {
        document.getElementById('openModalButton').click();
        if (response) {
          this.showError();
        } else {
          this.userService.register(this.user).subscribe(
            result => {
              this.loading = false;
              console.log('Response' + result);
            },
            error => console.log('Error' + error));
          console.log('User', this.user);
        }
      },
      error => console.log(error)
    );*/
    this.userService.register(this.user).subscribe(
      result => {
        this.loading = false;
        console.log('Response' + result);
      },
      error => console.log('Error' + error));
  }


  showError() {
  }

  accountCreated() {
    this.router.navigate(['']);
  }


}
