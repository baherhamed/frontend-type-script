import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { appsNames, site } from '../common';

@Injectable({
  providedIn: 'root',
})
export class SetAppNameService {
  constructor(private title: Title) {}

  setAppName = async (screen: string) => {
    const currentLang = localStorage.getItem(site.currentLangValue);
    const selectedApp = appsNames.findIndex((co) =>
      screen
        ? co.app?.toLowerCase() === screen?.toLowerCase() ||
          co.en?.toLowerCase() === screen.toLowerCase() ||
          co.ar?.toLowerCase() === screen.toLowerCase()
        : appsNames.findIndex((el) => el.app === 'home'),
    );

    let data;
    if (!currentLang || currentLang === site.language.ar) {
      this.title.setTitle(String(appsNames[selectedApp]?.ar));
      data = String(appsNames[selectedApp]?.ar);
    } else if (currentLang === site.language.en) {
      this.title.setTitle(String(appsNames[selectedApp]?.en));
      data = String(appsNames[selectedApp]?.en);
    }

    return data;
  };
}
