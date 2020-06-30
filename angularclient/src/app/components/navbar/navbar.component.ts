import {Component, ContentChild, OnInit, TemplateRef} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
    number: number;
    constructor(private router: Router, private toast: ToastrService, public authService: AuthService) {

    }

  ngOnInit(): void {
      this.authService.userLoggedIn();
  }

  logout(){
      sessionStorage.removeItem('AuthToken');
      localStorage.removeItem('user');
      this.authService.userLoggedIn();
      this.router.navigate(['welcome']);
          this.toast.success('Wylogowano');
  }

}
