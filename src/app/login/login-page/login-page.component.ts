import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {LoginService} from '../login.service';
import {AlertService} from '../../alert.service';
import {JwtHelper} from 'angular2-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  jwtHelper: JwtHelper = new JwtHelper();
  isLogging = false;

  constructor(private login$: LoginService,
              private alert$: AlertService,
              private router: Router) {
  }

  ngOnInit() {
  }

  enterLogin(event) {
    // enter login
    if (event.keyCode === 13) {
      this.doLogin();
    }
  }

  async doLogin() {

    try {
      this.isLogging = true;
      const token: any = await this.login$.testLogin(this.username, this.password);
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        const fullname = `${decodedToken.firstname} ${decodedToken.lastname}`;

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('fullname', fullname);
        // hide spinner
        this.isLogging = true;
        // redirect to main module
        this.router.navigate(['main']);
      } else {
        this.isLogging = false;
        this.alert$.error('Pleas enter valid login');
      }
    } catch (error) {
      this.isLogging = false;
      this.alert$.error(error.message);
    }
  }
}
