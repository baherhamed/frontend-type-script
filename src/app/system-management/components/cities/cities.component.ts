import { Component } from '@angular/core';
import { CitiesService, City, Gov, GovsService } from '../..';
import {
  DialogService,
  IResponse,
  NotificationService,
  SetTitleService,
  definitions,
  exportToExcel,
  getTokenValue,
  inputsLength,
  validateResponse,
} from 'src/app/shared';

@Component({
  selector: 'cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CitiesComponent {
  responsePaginationData: any;
  inputsLength: any;
  definitions: any;
  actionType: any;
  govsList: Gov[] = [];
  citiesList: City[] = [];
  busy = false;
  lang: any;

  city: City = {
    gov: {
      _id: '',
      name: '',
    },
    name: '',
    active: true,
  };

  tockenValues: any;
  userLoggedIn: boolean = false;
  securityPermissionsList: any[string];
  constructor(
    private dialog: DialogService,
    private govService: GovsService,
    private cityService: CitiesService,
    private title: SetTitleService,
    private notification: NotificationService
  ) {
    this.inputsLength = inputsLength;
    this.definitions = definitions;
  }

  async ngOnInit() {
    this.tockenValues = await getTokenValue();
    this.userLoggedIn = this.tockenValues?.userLoggedIn;
    this.securityPermissionsList = this.tockenValues?.permissionsList;
    this.actionType = null;
    this.citiesList = [];
    const currentLang = localStorage.getItem(definitions.currentLangValue);
    if (!currentLang || currentLang === definitions.language.ar) {
      this.title.setTitle('المدن');
    } else if (currentLang === definitions.language.en) {
      this.title.setTitle('Cities');
    }
    this.getActiveGovs();
    this.getAllCities();
  }

  async exportDataToExcel(table: any, file: any) {
    exportToExcel(table, file);
  }

  resetModel(action: string) {
    this.actionType = action;
    this.city = {
      gov: {
        _id: '',
        name: '',
      },
      name: '',
      active: true,
    };
  }

  async addCity(city: City) {
    const newCity = {
      govId: city.gov._id,
      name: city.name,
      active: city.active,
    };
    this.busy = true;
    this.cityService.addCity(newCity).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);

        this.citiesList.push({
          _id: Object(response.data)._id,
          gov: city.gov,
          name: city.name,
          active: city.active,
        });
        this.actionType = definitions.operation.result;
      }
      this.busy = false;
    });
  }

  searchCity(city: City, pagination?: any) {
    const searchData = {
      query: city,
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.cityService.searchCity(searchData).subscribe(async (res) => {
      this.responsePaginationData = res.paginationInfo;
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      } else {
        this.notification.success(response.message);
        this.citiesList = res.data;
        this.actionType = definitions.operation.result;
      }
      this.busy = false;
    });
  }

  async setData(city: City) {
    let selectedGov;

    for await (const gov of this.govsList) {
      if (gov && gov._id === city.gov._id) {
        selectedGov = gov;
      }
    }

    this.city = {
      _id: city._id,
      gov: selectedGov || city.gov,
      name: city.name,
      active: city.active,
    };
  }

  async updateCity(city: City) {
    const updatedCity = {
      _id: city._id,
      govId: city.gov._id,
      name: city.name,
      active: city.active,
    };
    this.busy = true;
    this.cityService
      .updateCity(updatedCity)
      .subscribe(async (res: IResponse) => {
        const response = await validateResponse(res);
        if (!response.success || !response.data) {
          this.notification.info(response.message);
        } else {
          this.notification.success(response.message);
          for await (let item of this.citiesList) {
            if (item._id === Object(response.data)._id) {
              definitions.spliceElementToUpdate(
                this.citiesList,
                Object(response.data)
              );
            }
          }
          this.actionType = definitions.operation.result;
        }
        this.busy = false;
      });
  }

  showDetails(templateRef: any) {
    this.dialog.showDetails(templateRef);
  }

  deleteCity(city: City) {
    let confirmMessage;
    if (!this.lang || this.lang === definitions.language.en) {
      confirmMessage = definitions.confirmMessage.en;
    }
    if (this.lang === definitions.language.ar) {
      confirmMessage = definitions.confirmMessage.ar;
    }
    const confirmDelete = confirm(confirmMessage);
    if (confirmDelete) {
      const deletedCity = {
        _id: city._id,
      };
      this.busy = true;
      this.cityService.deleteCity(deletedCity).subscribe(async (res) => {
        const response = await validateResponse(res);

        if (!response.success || !response.data) {
          this.notification.info(response.message);
        } else {
          this.notification.warning(response.message);
          for await (const item of this.citiesList) {
            if (String(item._id) === String(res.data._id)) {
              this.citiesList.forEach((item: any, index: number) => {
                if (item._id === res.data._id) {
                  this.citiesList.splice(index, 1);
                }
              });
            }
          }
        }
        this.busy = false;
      });
    }
  }

  getAllCities(pagination?: any) {
    const paginationData = {
      page: pagination?.pageIndex,
      limit: pagination?.pageSize,
    };
    this.busy = true;
    this.cityService.getAllCities(paginationData).subscribe(async (res) => {
      const response = await validateResponse(res);
      if (!response.success || !response.data) {
        this.notification.info(response.message);
      }
      this.responsePaginationData = res.paginationInfo;
      this.citiesList = res.data || [];

      this.actionType = definitions.operation.getAll;
      this.busy = false;
    });
  }

  getActiveGovs() {
    this.govService.getActiveGovs().subscribe(async (res) => {
      this.govsList = res.data || [];
    });
  }
  resetActionTypeToClose() {
    this.actionType = definitions.operation.close;
    this.getAllCities();
  }
}
