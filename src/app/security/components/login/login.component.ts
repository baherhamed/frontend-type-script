import { Component } from '@angular/core';
import { Login } from '../../models';
import { SecurityService } from '../../services';
import {
  getTokenValue,
  inputsLength,
  definitions,
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
  definitions: any;
  inputsLength: any;

  busy = false;
  login: Login = {
    username: '',
    password: '',
  };

  constructor(
    private securityService: SecurityService,
    private notification: NotificationService
  ) {
    this.inputsLength = inputsLength;
  }

  tryLogin(login: Login) {
    this.busy = true;
    this.securityService.login(login).subscribe(async (res) => {
      const response = await validateResponse(res);

      if (!response.success) {
        this.notification.info(response.message);
      } else {
        try {
          this.notification.success(response.message);
          localStorage.setItem(definitions.token, res.data.token);
          localStorage.setItem(definitions.routesList, res.data.routesList);
          localStorage.setItem(definitions.currentLangValue, res.data.language);
          localStorage.setItem(
            definitions.permissionsList,
            res.data.permissionsList
          );
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
