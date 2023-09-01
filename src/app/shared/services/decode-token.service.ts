// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { site } from '..';

// @Injectable({
//   providedIn: 'root',
// })
// export class DecodeTokenService {
//   static decodeToken: any;
//   constructor(private jwtHelper: JwtHelperService) {}

//   decodeToken() {
//     const token = localStorage.getItem(site.token);
//     let payload;
//     if (token) {
//       payload = this.jwtHelper.decodeToken(token);
//     } else {
//       payload = null;
//     }
//     return payload;
//   }
// }
