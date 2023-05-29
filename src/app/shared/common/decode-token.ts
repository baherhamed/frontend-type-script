import { Token } from '..';
import { definitions } from './definitions';
export async function getTokenValue() {
  let tokenValues;
  const routesList = [];
  const permissionsList = [];
  let decodeInfo: Token;
  let language;
  const token = localStorage.getItem(definitions.token);
  const localStorageRoutesList = localStorage.getItem(definitions.routesList);
  const localStoragePermissionsList = localStorage.getItem(
    definitions.permissionsList
  );

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
        .join('')
    );

    decodeInfo = JSON.parse(jsonPayload);

    if (decodeInfo.exp * 1000 > Date.now()) {
      language = localStorage.getItem(definitions.currentLangValue);
      // console.log('localStorageRoutesList', localStorageRoutesList);

      if (localStorageRoutesList) {
        const routesListArr = localStorageRoutesList.split(',');
        for await (const elem of routesListArr) {
          routesList.push(elem);
        }
      }

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
      localStorage.setItem(
        definitions.currentLangValue,
        definitions.language.ar
      );
      localStorage.removeItem(definitions.token);
      localStorage.removeItem(definitions.routesList);
      localStorage.removeItem(definitions.permissionsList);
      location.replace('/security/login');
      tokenValues = {
        userLoggedIn: false,
      };
    }
  } else if (!token) {
    localStorage.setItem(definitions.currentLangValue, definitions.language.en);
  }

  return tokenValues;
}
