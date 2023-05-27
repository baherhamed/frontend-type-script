import { Component, OnInit } from '@angular/core';
import {
  getTokenValue,
  inputsLength,
  Language,
  NotificationService,
  DialogService,
  SetTitleService,
  definitions,
  validateResponse,
} from 'src/app/shared';
import { Permission, Route, User } from '../../models';
import { RoutesService, UsersService } from '../../services';
import { DefinitionsService } from 'src/app/shared/services/definitions.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  responsePaginationData: any;
  userLoggedIn: boolean = false;
  isDeveloper: boolean = false;
  inputLength: any;
  definitions: any;
  actionType: any;
  languagesList: Language[] = [];
  usersList: User[] = [];
  routesList: Route[] = [];
  permissionsList: Permission[] = [];
  busy = false;
  lang: any;

  user: User = {
    name: '',
    mobile: '',
    email: '',
    password: '',
    language: {
      _id: '',
      name: '',
    },
    routesList: [],
    active: true,
  };

  tockenValues: any;
  securityPermissionsList: any[string];

  constructor(
    private dialog: DialogService,
    private userService: UsersService,
    private routeService: RoutesService,
    private title: SetTitleService,
    private definitionService: DefinitionsService,
    private notification: NotificationService
  ) {
    this.inputLength = inputsLength;
    this.definitions = definitions;
  }

  async ngOnInit() {
    this.tockenValues = await getTokenValue();
    this.userLoggedIn = this.tockenValues?.userLoggedIn;
    this.securityPermissionsList = this.tockenValues?.permissionsList;
    this.isDeveloper = this.tockenValues?.isDeveloper;
    this.actionType = null;
    const currentLang = localStorage.getItem(definitions.currentLangValue);
    if (!currentLang || currentLang === definitions.language.ar) {
      this.title.setTitle('المستخدمين');
    } else if (currentLang === definitions.language.en) {
      this.title.setTitle('Users');
    }
    this.getActiveLanguages();
    this.getActiveRouts();
    this.getAllUsers();
  }

  resetModel(action: string) {
    this.usersList = [];
    this.actionType = action;
    this.user = {
      name: '',
      mobile: '',
      email: '',
      password: '',
      language: {
        _id: '',
        name: '',
      },
      routesList: [],
      active: true,
    };
    this.getActiveRouts();
  }

  async addUser(user: User) {
    const routesList = await this.setRoleRoutesList();
    const permissionsList = await this.setPermissionsList();

    const newUser = {
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      routesList,
      permissionsList,
      password: user.password,
      language_id: user.language._id,
      active: user.active,
    };
    this.busy = true;
    this.userService.addUser(newUser).subscribe(async (res: any) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.actionType = '';
        this.usersList.push({
          _id: Object(response.data)._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          password: user.password,
          language: user.language,
          routesList: user.routesList,
          permissionsList: user.permissionsList,
          active: user.active,
        });
        this.actionType = definitions.operation.result;
      }
      this.busy = false;
    });
  }

  searchUser(user: User, pagination?: any) {
    const searchData = {
      query: user,
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.userService.searchUser(searchData).subscribe(async (res) => {
      this.responsePaginationData = res.paginationInfo;
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
        this.busy = false;
      } else {
        this.notification.success(response.message);
        this.usersList = res.data;
        this.actionType = definitions.operation.result;
      }
      this.busy = false;
    });
  }

  async updateUser(user: User) {
    const routesList = await this.setRoleRoutesList();
    const permissionsList = await this.setPermissionsList();

    const updatedUser = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      password: user.password,
      language_id: user.language._id,
      routesList,
      permissionsList,
      active: user.active,
    };
    this.busy = true;

    this.userService.updateUser(updatedUser).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        for await (let item of this.usersList) {
          if (item._id === res.data._id) {
            definitions.spliceElementToUpdate(this.usersList, res.data);
          }
        }
        this.actionType = definitions.operation.result;
      }
      this.busy = false;
    });
  }

  deleteUser(user: User) {
    let confirmMessage;
    if (!this.lang || this.lang === definitions.language.en) {
      confirmMessage = definitions.confirmMessage.en;
    }
    if (this.lang === definitions.language.ar) {
      confirmMessage = definitions.confirmMessage.ar;
    }
    const confirmDelete = confirm(confirmMessage);
    if (confirmDelete) {
      const deletedRuser = {
        _id: user._id,
      };
      this.busy = true;
      this.userService.deleteUser(deletedRuser).subscribe(async (res: any) => {
        const response = await validateResponse(res);
        if (!response.success || !response.data) {
          this.notification.info(response.message);
        } else {
          this.notification.warning(response.message);
          for await (const item of this.usersList) {
            if (String(item._id) === String(res.data._id)) {
              this.usersList.forEach((item: any, index: number) => {
                if (item._id === res.data._id) {
                  this.usersList.splice(index, 1);
                }
              });
            }
          }
        }
        this.busy = false;
      });
    }
  }

  showDetails(templateRef: any) {
    this.dialog.showDetails(templateRef);
  }

  async setDetailsData(user: User) {
    console.log('routesList', user);
    this.user = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      language: user.language,
      routesList: user.routesList,
      active: user.active,
    };
  }

  async setData(user: User) {
    let selectedLanguage;
    for await (const lang of this.languagesList) {
      if (lang && lang._id === user.language._id) {
        selectedLanguage = lang;
      }
    }

    for await (const item of this.permissionsList) {
      for await (const elem of user.permissionsList) {
        if (elem.active && item._id === elem._id) {
          item.active = true;
        }
      }
    }

    this.user = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      language: selectedLanguage || user.language,
      routesList: this.routesList,
      permissionsList: this.permissionsList,
      active: user.active,
    };
  }

  async setRoleRoutesList() {
    const selectedRoutesList = [];
    for await (const route of this.routesList) {
      if (route && route.active) {
        selectedRoutesList.push(route.name);
      }
    }
    return selectedRoutesList;
  }

  async setPermissionsList() {
    const selectedPermissionsList = [];
    for await (const route of this.routesList) {
      if (route && route.active) {
        for await (const permission of route.permissionsList) {
          if (permission && permission.active) {
            selectedPermissionsList.push(permission.name);
          }
        }
      }
    }

    return selectedPermissionsList;
  }

  getActiveLanguages() {
    this.definitionService.getActiveLanguages().subscribe(async (res) => {
      this.languagesList = res.data;
    });
  }

  getActiveRouts() {
    this.routesList = [];
    this.routeService.getActiveRouts().subscribe(async (res) => {
      this.routesList = res.data;
    });
  }

  getAllUsers(pagination?: any) {
    const paginationData = {
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.userService.getAllUsers(paginationData).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      }
      this.responsePaginationData = res.paginationInfo;
      this.usersList = res.data || [];
      this.actionType = definitions.operation.getAll;
      this.busy = false;
    });
  }

  resetActionTypeToClose() {
    this.actionType = definitions.operation.close;
    this.getAllUsers();
  }
}
