/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import devtools from 'devtools-detect';

export const site = {
  companyInfo: {
    address:
      'السنطة ش الجمهورية برج الكمال الدور الثاني بجوار مكتب بريد السنطة فرعي',
    phone: '0404475000',
    mobile: '01065055550',
  },
  api: '/api/',
  modules: {
    security: 'security/',
    systemManagement: 'systemManagement/',
  },
  appsRoutes: {
    login: 'login',
    add: 'add',
    update: 'update',
    search: 'search',
    delete: 'delete',
    getAll: 'getAll',
    getActive: 'getActive',
    getCitiesByGov: 'getCitiesByGov',
    changePassword: 'changePassword',
  },
  apps: {
    home: 'home',
    login: 'login',
    languages: 'languages/',
    routes: 'routes/',
    users: 'users/',
    govs: 'govs/',
    cities: 'cities/',
  },
  token: 'token',
  routesList: 'routesList',
  permissionsList: 'permissionsList',
  currentLangValue: 'language',
  language: { ar: 'ar', en: 'en' },
  requestHeaders: () => {
    const token = localStorage.getItem('token');
    const language = localStorage.getItem('language');
    const newHeader = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept-language', `${language}`)
      .set('Authorization', `Bearer ${token}`);

    return { headers: newHeader, observe: 'response' };
  },
  requestHeadersForLogin: () => {
    const language = localStorage.getItem('language');
    const newHeader = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept-language', `${language}`);

    return { headers: newHeader };
  },
  notificationType: {
    error: 'error',
    success: 'success',
    info: 'info',
    deleted: 'deleted',
    warning: 'warning',
  },
  operation: {
    add: 'add',
    update: 'update',
    search: 'search',
    getAll: 'getAll',
    result: 'result',
    close: 'close',
  },
  messageTitle: {
    error: {
      ar: 'خطأ',
      en: 'Error',
    },
    success: {
      ar: 'نجاح',
      en: 'Success',
    },
    info: {
      ar: 'معلومات',
      en: 'Info',
    },
    deleted: {
      ar: 'حذف',
      en: 'Deleted',
    },
    warning: {
      en: 'Warining',
      ar: 'تحذير',
    },
  },
  confirmMessage: {
    ar: 'هل أنت متأكد?',
    en: 'Are You Sure?',
  },
  removeElement: (array: any[], elem: any): any => {
    const itm = array.indexOf(elem);
    if (itm > -1) {
      array.splice(itm, 1);
    }
  },
  spliceElementToUpdate: (array: any[], elem: { _id: any }): any => {
    array.forEach((itm, i) => {
      if (itm._id === elem._id) {
        array.splice(i, 1, elem);
      }
    });
  },
  spliceElementToDelete: (array: any[], elem: any): any => {
    array.forEach(function (itm, i): any {
      if (itm._id === elem._id) {
        return array.splice(i, 1, elem);
      }
    });
  },
  setDaysList: () => {
    const daysList = [];
    for (let i = 1; i < 32; i++) {
      daysList.push(i);
    }
    return daysList;
  },
  setMonthsList: () => {
    const monthsList = [];
    for (let i = 1; i < 13; i++) {
      monthsList.push(i);
    }
    return monthsList;
  },
  setYearsList: () => {
    const yearsList = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 15; i++) {
      yearsList.push(i);
    }
    return yearsList;
  },
  disableDeveloperTools: () => {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
    if (devtools.isOpen) {
      localStorage.removeItem(site.token);
      localStorage.removeItem(site.routesList);
      localStorage.removeItem(site.permissionsList);
      const currentUrl = environment.route;
      if (window.location.href.includes(currentUrl)) {
        window.location.replace('http://www.google.com');
      }
    }
  },
  convertDate: (date: string) => {
    return new Date(date).toISOString().slice(0, 10);
  },

};
