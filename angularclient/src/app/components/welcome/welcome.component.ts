import {Component, OnInit} from '@angular/core';
import {LoginComponent} from '../login/login.component';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Recipe} from '../../model/Recipe';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

    constructor(private router: Router, private authService: AuthService) {
    }

    ngOnInit(): void {

    }

    gotologin() {
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            const userRole = JSON.parse(localStorage.getItem('user')).role;
            if (this.authService.userLoggedIn) {
                this.router.navigate(['addrecipes']);
            } else {

            }

        }
        else{
            this.router.navigate(['login']);

        }
    }

}
