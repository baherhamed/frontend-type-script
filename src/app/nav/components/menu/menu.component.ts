/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangePassword, UsersService } from 'src/app/security';
import {
  site,
  DialogService,
  getTokenValue,
  inputsLength,
  NotificationService,
  routesNames,
  validateResponse,
  SetComponentNameService,
} from 'src/app/shared';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  userLoggedIn: boolean = false;
  isDeveloper: boolean = false;
  name: string | undefined;
  routesList: string[] = [];
  tokenValues: any;
  permissionsList: string[] = [];
  language: string = '';
  busy = false;
  inputsLength: any;
  routesNames: any;
  newPasswordPassword: ChangePassword = {
    _id: '',
    password: '',
  };
  componentName: string = '';
  title: any;
  constructor(
    private dialog: DialogService,
    private userService: UsersService,
    private translateService: TranslateService,
    private notification: NotificationService,
    private setComponentNameService: SetComponentNameService,
    private router: Router,
  ) {
    this.inputsLength = inputsLength;
    this.routesNames = routesNames;
    this.getRoute();
  }

  async ngOnInit() {
    this.tokenValues = await getTokenValue();
    this.userLoggedIn = this.tokenValues?.userLoggedIn;
    this.isDeveloper = this.tokenValues?.isDeveloper;
    this.routesList = this.tokenValues?.routesList;
    this.permissionsList = this.tokenValues?.permissionsList;
    this.name = this.tokenValues?.name;
    this.language = this.tokenValues?.language;
    this.setTitle(this.title);
  }

  async setTitle(screen: string) {
    this.title = await this.setComponentNameService.setComponentName(screen);
  }

  getRoute() {
    const selectedRoute = this.router.url !== '/' ? this.router.url : 'home';
    this.title = selectedRoute;
  }

  changeLanguage() {
    const currentLanguage = localStorage.getItem(site.currentLangValue);

    if (currentLanguage) {
      this.language = currentLanguage;
    }
    const htmlTag = document.querySelector('html');
    let setLang = '';
    let newlanguage = '';
    if (!currentLanguage || currentLanguage === site.language.ar) {
      if (htmlTag) {
        htmlTag.setAttribute('dir', 'ltr');
        setLang = site.language.en;
        newlanguage = site.language.en;
      }
    } else if (currentLanguage && currentLanguage === site.language.en) {
      if (htmlTag) {
        htmlTag.setAttribute('dir', 'rtl');
        setLang = site.language.ar;
        newlanguage = site.language.ar;
      }
    }
    this.translateService.setDefaultLang(setLang);
    localStorage.removeItem(site.currentLangValue);
    localStorage.setItem(site.currentLangValue, newlanguage);
    location.reload();
    this.setTitle(this.title);
  }

  changePassword(data: any) {
    const newPassData = {
      _id: this.tokenValues.userId,
      password: data.password,
    };
    this.busy = true;
    this.userService.changePassword(newPassData).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
        this.busy = false;
      } else {
        this.notification.success(response.message);
      }
      this.busy = false;
    });
  }

  showDetails(templateRef: any) {
    this.newPasswordPassword.password = '';
    this.dialog.showDetails(templateRef);
  }

  logout() {
    localStorage.removeItem(site.token);
    localStorage.removeItem(site.routesList);
    localStorage.removeItem(site.permissionsList);
    location.assign('/');
  }
}
