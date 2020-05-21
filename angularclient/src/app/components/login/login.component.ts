import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../../model/User';
import {AuthService} from '../services/auth.service';
import {TokenStorage} from '../services/token.storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  email: string;
  password: string;

  constructor(private userService: UserService,  private authService: AuthService, private token: TokenStorage, private router: Router) {
    this.user = new User(null, null, null, null, null, null, null, false);
  }

  ngOnInit(): void {

  }

  login() {

    this.authService.attemptAuth(this.email, this.password).subscribe(
      data => {
        console.log(this.email);
        console.log(this.password);
        this.token.saveToken(data.token);
        console.log(data.token);
        this.router.navigate(['welcome']);
      }
    );

    this.userService.checkIfUserExists(this.email).subscribe(
      data => {
        console.log(data);
        //this.router.navigate(['welcome']);
      }
    );

    this.user.email = this.email;
    this.userService.getUserByEmail(this.user.email).subscribe(
      data => {
        console.log(data);
        this.user = data;
        console.log(this.user);
        //this.router.navigate(['welcome']);
      }
    );
  }

}
