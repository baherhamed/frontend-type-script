/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Gov, GovsService } from '../..';
import {
  DialogService,
  IResponse,
  NotificationService,
  site,
  permissionsNames,
  exportToExcel,
  getTokenValue,
  inputsLength,
  validateResponse,
  ResponsePaginationData,
  TokenValues,
} from 'src/app/shared';

@Component({
  selector: 'govs',
  templateUrl: './govs.component.html',
  styleUrls: ['./govs.component.scss'],
})
export class GovsComponent implements OnInit {
  responsePaginationData: ResponsePaginationData | undefined;
  inputsLength: any;
  site: any;
  permissionsNames: any;
  actionType: string = '';
  govsList: Gov[] = [];
  busy = false;
  lang: string = '';

  gov: Gov = {
    name: '',
    code: '',
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
    private govService: GovsService,
    private notification: NotificationService,
  ) {
    this.inputsLength = inputsLength;
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

    this.getAllGovs();
  }

  async exportDataToExcel(table: any, file: any) {
    exportToExcel(table, file);
  }

  resetModel(action: string) {
    this.actionType = action;
    this.gov = {
      name: '',
      code: '',
      active: true,
    };
  }

  async addGov(gov: Gov) {
    this.busy = true;
    this.govService.addGov(gov).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);

        this.govsList.push({
          _id: Object(response.data)._id,
          name: gov.name,
          code: gov.code,
          active: gov.active,
        });
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  async updateGov(gov: Gov) {
    this.busy = true;
    this.govService.updateGov(gov).subscribe(async (res: IResponse) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        for await (const item of this.govsList) {
          if (item._id === Object(response.data)._id) {
            site.spliceElementToUpdate(this.govsList, Object(response.data));
          }
        }
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  deleteGov(gov: Gov) {
    let confirmMessage;
    if (!this.lang || this.lang === site.language.en) {
      confirmMessage = site.confirmMessage.en;
    }
    if (this.lang === site.language.ar) {
      confirmMessage = site.confirmMessage.ar;
    }
    const confirmDelete = confirm(confirmMessage);
    if (confirmDelete) {
      const deletedGov = {
        _id: gov._id,
      };
      this.busy = true;
      this.govService.deleteGov(deletedGov).subscribe(async (res) => {
        const response = await validateResponse(res);

        if (!response.success || !response.data) {
          this.notification.info(response.message);
        } else {
          this.notification.warning(response.message);
          for await (const item of this.govsList) {
            if (String(item._id) === String(res.data._id)) {
              this.govsList.forEach((item: any, index: number) => {
                if (item._id === res.data._id) {
                  this.govsList.splice(index, 1);
                }
              });
            }
          }
        }
        this.busy = false;
      });
    }
  }

  searchGov(gov: Gov, pagination?: any) {
    const searchData = {
      query: gov,
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.govService.searchGov(searchData).subscribe(async (res) => {
      this.responsePaginationData = res.paginationInfo;
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.govsList = res.data;
        this.actionType = site.operation.result;
      }
      this.busy = false;
    });
  }

  setData(gov: Gov) {
    this.gov = {
      _id: gov._id,
      name: gov.name,
      code: gov.code,
      active: gov.active,
    };
  }

  getAllGovs(pagination?: any) {
    const paginationData = {
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.govService.getAllGovs(paginationData).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      }
      this.responsePaginationData = res.paginationInfo;
      this.govsList = res.data || [];

      this.actionType = site.operation.getAll;
      this.busy = false;
    });
  }

  resetActionTypeToClose() {
    this.actionType = site.operation.close;
    this.getAllGovs();
  }
}
