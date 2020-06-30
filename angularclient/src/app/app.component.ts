import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-dream-app';
  loggedIn: boolean;
  constructor(private authService: AuthService) {
    this.loggedIn = false;
  }

  ngOnInit(): void {
    this.loggedIn = this.authService.userLoggedIn();
  }


}
