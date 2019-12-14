import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

import { ITokenPayload } from "../token-payload";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  message: string;

  credentials: ITokenPayload = {
    username: '',
    password: ''
  };

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
    authService.getAdminDetails();
  }

  setMessage() {
    //this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    this.message = '';
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login(this.credentials).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/admin';

        // Redirect the user
        this.router.navigateByUrl(redirect);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}