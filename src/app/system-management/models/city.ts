import { Gov } from '.';

export interface City {
  _id?: string;
  gov: Gov;
  name: string;
  active: boolean;
}
