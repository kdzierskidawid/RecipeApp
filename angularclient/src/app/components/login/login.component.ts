import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  email: string;
  password: string;

  constructor(private userService: UserService) {
    this.user = new User(null, null, null, null, null, null, null, false);
  }

  ngOnInit(): void {

  }

  login() {
    console.log(this.user.email);
    this.userService.getByEmail(this.user.email).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      }
  );

  }

}
