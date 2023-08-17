import { Component } from '@angular/core';

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
  tockenValues: any;
  permissionsList: string[] = [];
  themesList = [
    site.themes.deeppurple,
    site.themes.indigo,
    site.themes.pink,
    site.themes.purple,
  ];
  themePath = `./assets/themes/`;
  seletcedTheme: string = '';
  theme: string = '';
  language: string = '';
  busy = false;
  inputsLength: any;
  routesNames: any[string];
  newPasswordPassword: ChangePassword = {
    _id: '',
    password: '',
  };

  constructor(
    private dialog: DialogService,
    private userService: UsersService,
    private translateService: TranslateService,
    private notification: NotificationService
  ) {
    this.inputsLength = inputsLength;
    this.routesNames = routesNames;
  }

  async ngOnInit() {
    this.tockenValues = await getTokenValue();
    this.userLoggedIn = this.tockenValues?.userLoggedIn;
    this.isDeveloper = this.tockenValues?.isDeveloper;
    this.routesList = this.tockenValues?.routesList;
    this.permissionsList = this.tockenValues?.permissionsList;
    this.name = this.tockenValues?.name;
    this.language = this.tockenValues?.language;

    this.changeTheme();
  }

  changeTheme() {
    const htmlTag = document.querySelector('link#them');
    this.theme = this.seletcedTheme
      ? `${this.themePath}${this.seletcedTheme}.css`
      : `${this.themePath}${site.themes.default}.css`;

    htmlTag?.removeAttribute('href');
    htmlTag?.setAttribute('href', this.theme);
  }

  changeLanguage() {
    const currentLanguage = localStorage.getItem(site.currentLangValue);

    if (currentLanguage) {
      this.language = currentLanguage;
    }
    let htmlTag = document.querySelector('html');
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
  }

  changePassword(data: any) {
    const newPassData = {
      _id: this.tockenValues.userId,
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
