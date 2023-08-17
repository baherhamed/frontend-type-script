import { Permission, Route } from '.';

export interface User {
  _id?: string;
  name: string;
  mobile: string;
  email: string;
  password?: string;
  language: {
    _id: string;
    name: string;
  };
  routesList: Route[];
  permissionsList?: Permission[];
  active: boolean;
}
