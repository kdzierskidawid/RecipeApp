import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';
import {AuthService} from '../../services/auth.service';
import {TokenStorage} from '../../services/token.storage';
import {Router} from '@angular/router';
import {$} from 'protractor';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user: User;
    email: string;
    password: string;

    constructor(private userService: UserService, private authService: AuthService, private token: TokenStorage, private router: Router,
                private toast: ToastrService) {
        this.user = new User(null, null, null, null, null, null, null, false);
    }

    ngOnInit(): void {

    }

    login() {

        this.authService.attemptAuth(this.email, this.password).subscribe(
            data => {
                console.log(this.email);
                console.log(this.password);
                if (data === null) {
                    this.toast.error('Błędne dane. Spróbuj ponownie');
                    console.log('błędne hasło');
                }
                else {
                    this.userService.checkIfUserIsActive(this.email).subscribe(aktive=>{
                        if(aktive){
                            console.log('sprawdzam aktywnosc: ' + this.userService.getByEmail(this.email));
                            this.token.saveToken(data.token);
                            console.log(data.token);
                            this.user.email = this.email;
                            if (sessionStorage.getItem('AuthToken') != null) {
                                this.userService.checkIfUserExists(this.email).subscribe(
                                    exists => {
                                        console.log(exists);
                                        //this.router.navigate(['welcome']);
                                    }
                                );

                                this.userService.getUserByEmail(this.user.email).subscribe(
                                    user => {
                                        console.log(user);
                                        this.user = user;
                                        console.log(this.user);
                                        console.log(this.user);
                                        //this.router.navigate(['welcome']);
                                        this.userService.sendPassword(this.password).subscribe(result => {
                                            console.log('wysłano hasło: ' + this.password);
                                            this.userService.checkPassword(this.user).subscribe(checkPassword => {
                                                console.log('Sprawdzono usera: ' + this.user.password);
                                            });
                                        });
                                        localStorage.setItem('user', JSON.stringify(this.user));
                                    }
                                );
                            }
                            this.router.navigate(['allrecipes']);
                        }
                        else{
                            this.toast.error('Konto nie zostało aktywowane. Sprawdź pocztę!');
                        }
                    });

                }

            },
            er => {
                console.log('ZŁE HASEŁKO ZIOMECZEK');
            });


    }

}
