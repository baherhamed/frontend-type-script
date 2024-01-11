export interface TokenValues {
  userId: string;
  name: string;
  language: string;
  routesList: string[];
  permissionsList: string[];
  isDeveloper?: boolean;
  isAdmin?: boolean;
  userLoggedIn: boolean;
}
