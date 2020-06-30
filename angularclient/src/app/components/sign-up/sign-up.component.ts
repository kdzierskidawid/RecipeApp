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
              private router: Router) {
    this.user = new User(null, null, null, null, null, null, null, false);
  }

  ngOnInit(): void {
  }

  register(){

    this.userService.checkIfUserExists(this.user.email).subscribe(exists=>{
      if(exists){
       // this.toast.error('Użytkownik o takim email istnieje!!');
      }
      else{
        this.user.role = 'ROLE_USER';
        this.userService.register(this.user).subscribe(
            result => {
              //this.toast.success('Zarejestrowano pomyślnie. Sprawdź email!');
              this.loading = false;
              console.log('Response' + result);
            },
            error => console.log('Error' + error));
      }
    });

  }

  showError() {
  }

  accountCreated() {
    this.router.navigate(['']);
  }


}
