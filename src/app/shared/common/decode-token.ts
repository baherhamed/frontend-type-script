import { Token, TokenValues, hashString } from '..';
import { site } from './site';
export async function getTokenValue() {
  let tokenValues: TokenValues = {
    userId: '',
    name: '',
    language: '',
    routesList: [],
    permissionsList: [],
    isDeveloper: false,
    userLoggedIn: false,
  };
  const routesList = [];
  const permissionsList = [];
  let decodeInfo: Token;
  let language;
  const token = localStorage.getItem(site.token);
  const storageRoutesList = localStorage.getItem(site.routesList) || '';
  const storagePermissionsList =
    localStorage.getItem(site.permissionsList) || '';
  const localStorageRoutesList = (await hashString(storageRoutesList))
    .hashedText;
  const localStoragePermissionsList = (await hashString(storagePermissionsList))
    .hashedText;
  if (token) {
    const base64Url = token.split('.')[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    decodeInfo = JSON.parse(jsonPayload);

    if (decodeInfo.exp * 1000 > Date.now()) {
      language =
        localStorage.getItem(site.currentLangValue) || site.language.ar;

      if (localStorageRoutesList) {
        const routesListArr = localStorageRoutesList.split(',');
        for await (const elem of routesListArr) {
          routesList.push(elem);
        }
      }
      // console.log('localStoragePermissionsList', localStoragePermissionsList);

      if (localStoragePermissionsList) {
        const permissionsListArr = localStoragePermissionsList.split(',');
        for await (const elem of permissionsListArr) {
          permissionsList.push(elem);
        }
      }

      tokenValues = {
        userId: decodeInfo.userId,
        name: decodeInfo.name,
        isDeveloper: decodeInfo.isDeveloper,
        language,
        routesList,
        permissionsList,
        userLoggedIn: true,
      };

      // console.log('token', token);
      // console.log('decodeInfo', decodeInfo);
      // console.log('tokenValues', tokenValues);
    } else {
      localStorage.setItem(site.currentLangValue, site.language.ar);
      localStorage.removeItem(site.token);
      localStorage.removeItem(site.routesList);
      localStorage.removeItem(site.permissionsList);
      location.replace('/security/login');
      tokenValues.userLoggedIn = false;
    }
  } else if (!token) {
    localStorage.setItem(site.currentLangValue, site.language.en);
  }

  return tokenValues;
}
