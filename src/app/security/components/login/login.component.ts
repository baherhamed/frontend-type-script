/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component } from '@angular/core';
import { Login } from '../../interfaces';
import { SecurityService } from '../../services';
import {
  getTokenValue,
  inputsLength,
  site,
  NotificationService,
  validateResponse,
} from 'src/app/shared';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userLoggedIn?: boolean = false;
  userType: string | undefined;
  site: any;
  inputsLength: any;

  busy = false;
  login: Login = {
    username: '',
    password: '',
  };

  constructor(
    private securityService: SecurityService,
    private notification: NotificationService,
  ) {
    this.inputsLength = inputsLength;
  }

  tryLogin(login: Login) {
    this.busy = true;
    this.securityService.login(login).subscribe(async (res) => {
      const response = await validateResponse(res);

      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        try {
          this.notification.success(response.message);
          localStorage.setItem(site.token, res.data.token);
          localStorage.setItem(site.routesList, res.data.routesList);
          localStorage.setItem(site.permissionsList, res.data.permissionsList);
          localStorage.setItem(site.currentLangValue, res.data.language);
          const tockenValues = await getTokenValue();
          this.userLoggedIn = tockenValues?.userLoggedIn;
          location.assign('/');
        } catch (error) {
          alert(error);
        }
      }
      this.busy = false;
    });
  }
}
