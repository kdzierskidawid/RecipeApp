import { Component, OnInit } from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
