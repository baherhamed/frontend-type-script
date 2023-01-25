// import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { definitions } from '..';

// @Injectable({
//   providedIn: 'root',
// })
// export class DecodeTokenService {
//   static decodeToken: any;
//   constructor(private jwtHelper: JwtHelperService) {}

//   decodeToken() {
//     const token = localStorage.getItem(definitions.token);
//     let payload;
//     if (token) {
//       payload = this.jwtHelper.decodeToken(token);
//     } else {
//       payload = null;
//     }
//     return payload;
//   }
// }
