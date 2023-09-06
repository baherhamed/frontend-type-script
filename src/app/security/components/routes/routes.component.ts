/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import {
  inputsLength,
  NotificationService,
  DialogService,
  validateResponse,
  getTokenValue,
  site,
  exportToExcel,
  IResponse,
  ResponsePaginationData,
  TokenValues,
} from 'src/app/shared';
import { Permission, Route, RoutesService } from '../..';

@Component({
  selector: 'routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  responsePaginationData: ResponsePaginationData | undefined;
  inputsLength: any;
  site: any;
  actionType: string = '';
  routesList: Route[] = [];
  busy = false;
  lang: string = '';
  route: Route = {
    name: '',
    ar: '',
    en: '',
    permissionsList: [],
    active: true,
  };

  permission: Permission = {
    name: '',
    ar: '',
    en: '',
    active: true,
  };

  tokenValues: TokenValues = {
    userId: '',
    name: '',
    language: '',
    routesList: [],
    permissionsList: [],
    isDeveloper: false,
    userLoggedIn: false,
  };

  constructor(
    private dialog: DialogService,
    private routeService: RoutesService,

    private notification: NotificationService,
  ) {
    this.inputsLength = inputsLength;
    this.site = site;
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
    this.getAllRouts();
  }

  async exportDataToExcel(table: any, file: any) {
    exportToExcel(table, file);
  }

  resetModel(action: string) {
    this.actionType = action;
    this.route = {
      name: '',
      ar: '',
      en: '',
      permissionsList: [],
      active: true,
    };
  }

  async setPermissionsList(list: Permission[]) {
    let permissionsList;
    if (list.length) {
      permissionsList = [];
      for await (const permission of list) {
        if (permission) {
          permissionsList.push({
            _id: permission?._id,
            name: permission?.name,
            ar: permission?.ar,
            en: permission?.en,
            active: permission?.active,
          });
        }
      }
      return permissionsList;
    } else {
      return (permissionsList = null);
    }
  }

  async addRoute(route: Route) {
    const permissionsList = await this.setPermissionsList(
      route.permissionsList,
    );
    const newRoute = {
      name: route.name,
      ar: route.ar,
      en: route.en,
      active: route.active,
      permissionsList,
    };
    this.busy = true;
    this.routeService.addRoute(newRoute).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.routesList.push({
          _id: Object(response.data)._id,
          name: route.name,
          ar: route.ar,
          en: route.en,
          active: route.active,
          permissionsList: Object(response.data).permissionsList,
        });
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  searchRoute(route: Route, pagination?: any) {
    const searchData = {
      query: route,
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.routeService.searchRoute(searchData).subscribe(async (res) => {
      this.responsePaginationData = res.paginationInfo;
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.routesList = res.data;
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  setData(route: Route) {
    this.route = {
      _id: route._id,
      name: route.name,
      ar: route.ar,
      en: route.en,
      permissionsList: route.permissionsList,
      active: route.active,
    };
  }

  async updateRoute(route: Route) {
    const permissionsList = await this.setPermissionsList(
      route.permissionsList,
    );
    const updateRoute = {
      _id: route._id,
      name: route.name,
      ar: route.ar,
      en: route.en,
      active: route.active,
      permissionsList,
    };
    this.busy = true;
    this.routeService
      .updateRoute(updateRoute)
      .subscribe(async (res: IResponse) => {
        const response = await validateResponse(res);
        if (!response.success) {
          this.notification.info(response.message);
        } else {
          this.notification.success(response.message);
          for await (const item of this.routesList) {
            if (item._id === Object(response.data)._id) {
              site.spliceElementToUpdate(
                this.routesList,
                Object(response.data),
              );
            }
          }
          this.actionType = site.operation.result;
        }
        this.busy = false;
      });
  }

  deleteRoute(route: Route) {
    let confirmMessage;
    if (!this.lang || this.lang === site.language.en) {
      confirmMessage = site.confirmMessage.en;
    }
    if (this.lang === site.language.ar) {
      confirmMessage = site.confirmMessage.ar;
    }
    const confirmDelete = confirm(confirmMessage);
    if (confirmDelete) {
      const deletedRoute = {
        _id: route._id,
      };
      this.busy = true;
      this.routeService
        .deleteRoute(deletedRoute)
        .subscribe(async (res: any) => {
          const response = await validateResponse(res);
          if (!response.success || !response.data) {
            this.notification.info(response.message);
          } else {
            this.notification.warning(response.message);
            for await (const item of this.routesList) {
              if (String(item._id) === String(res.data._id)) {
                this.routesList.forEach((item: any, index: number) => {
                  if (item._id === res.data._id) {
                    this.routesList.splice(index, 1);
                  }
                });
              }
            }
          }
          this.busy = false;
        });
    }
  }

  getAllRouts(pagination?: any) {
    const paginationData = {
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.routeService.getAllRouts(paginationData).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      }
      this.responsePaginationData = res.paginationInfo;
      this.routesList = res.data || [];
      this.actionType = site.operation.getAll;
      this.busy = false;
    });
  }

  pushPermissionToPermissionsList(permission: Permission) {
    this.route.permissionsList.push({
      name: permission.name,
      ar: permission.ar,
      en: permission.en,
      active: permission.active,
    });
    this.resetPermission();
  }

  async removeUnitFromUnitsList(permission: Permission) {
    for (let i = 0; i < this.route.permissionsList.length; i++) {
      if (this.route.permissionsList[i] === permission) {
        this.route.permissionsList.splice(i, 1);
      }
    }
  }

  resetPermission() {
    this.permission = {
      name: '',
      ar: '',
      en: '',
      active: true,
    };
  }
  resetActionTypeToClose() {
    this.actionType = site.operation.close;
    this.getAllRouts();
  }
}
