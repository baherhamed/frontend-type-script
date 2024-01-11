/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import {
  getTokenValue,
  inputsLength,
  Language,
  NotificationService,
  DialogService,
  site,
  validateResponse,
  exportToExcel,
  permissionsNames,
  ResponsePaginationData,
  TokenValues,
} from 'src/app/shared';
import { Permission, Route, User } from '../../interfaces';
import { RoutesService, UsersService } from '../../services';
import { DefinitionsService } from 'src/app/shared/services/definitions.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  responsePaginationData: ResponsePaginationData | undefined;
  inputLength: any;
  site: any;
  permissionsNames: any;
  actionType: string = '';
  languagesList: Language[] = [];
  usersList: User[] = [];
  routesList: Route[] = [];
  permissionsList: Permission[] = [];
  busy = false;
  lang: string = '';

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
    permissionsList: [],
    isAdmin: false,
    active: true,
  };

  tokenValues: TokenValues = {
    userId: '',
    name: '',
    language: '',
    routesList: [],
    permissionsList: [],
    isAdmin: false,
    isDeveloper: false,
    userLoggedIn: false,
  };

  constructor(
    private dialog: DialogService,
    private userService: UsersService,
    private routeService: RoutesService,
    private definitionService: DefinitionsService,
    private notification: NotificationService,
  ) {
    this.inputLength = inputsLength;
    this.site = site;
    this.permissionsNames = permissionsNames;
  }

  displayAdd(templateRef: any) {
    this.dialog.showAdd(templateRef);
  }

  displayUpdate(templateRef: any) {
    this.dialog.showUpdate(templateRef);
  }

  displaySearch(templateRef: any) {
    this.dialog.showSearch(templateRef);
  }

  showDetails(templateRef: any) {
    this.dialog.showDetails(templateRef);
  }
  async ngOnInit() {
    this.tokenValues = await getTokenValue();
    this.getActiveLanguages();
    this.getActiveRouts();
    this.getAllUsers();
  }

  async exportDataToExcel(table: any, file: any) {
    exportToExcel(table, file);
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
      routesList: this.routesList,
      permissionsList: [],
      isAdmin: false,
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
      languageId: user.language._id,
      isAdmin: user.isAdmin,
      active: user.active,
    };
    this.busy = true;
    this.userService.addUser(newUser).subscribe(async (res: any) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        return this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.usersList.push({
          _id: Object(response.data)._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          password: user.password,
          language: user.language,
          routesList: user.routesList,
          permissionsList: user.permissionsList,
          isAdmin: user.isAdmin,
          active: user.active,
        });
        this.actionType = site.operation.result;
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
        this.actionType = site.operation.result;
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
      languageId: user.language._id,
      routesList,
      permissionsList,
      isAdmin: user.isAdmin,
      active: user.active,
    };
    this.busy = true;

    this.userService.updateUser(updatedUser).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        for await (const item of this.usersList) {
          if (item._id === res.data._id) {
            site.spliceElementToUpdate(this.usersList, res.data);
          }
        }
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  deleteUser(user: User) {
    let confirmMessage;
    if (!this.lang || this.lang === site.language.en) {
      confirmMessage = site.confirmMessage.en;
    }
    if (this.lang === site.language.ar) {
      confirmMessage = site.confirmMessage.ar;
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

  async setDetailsData(user: User) {
    this.user = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      language: user.language,
      routesList: user.routesList,
      permissionsList: user.permissionsList,
      isAdmin: user.isAdmin,
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

    this.user = {
      _id: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      language: selectedLanguage || user.language,
      routesList: user.routesList,
      isAdmin: user.isAdmin,
      active: user.active,
    };
  }

  async setRoleRoutesList() {
    const selectedRoutesList = [];
    for await (const route of this.user.routesList) {
      if (route && route.active) {
        selectedRoutesList.push(route.name);
      }
    }
    return selectedRoutesList;
  }

  async setPermissionsList() {
    const selectedPermissionsList = [];
    for await (const route of this.user.routesList) {
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
      this.actionType = site.operation.getAll;
      this.busy = false;
    });
  }

  resetActionTypeToClose() {
    this.actionType = site.operation.close;
    this.getAllUsers();
  }
}
