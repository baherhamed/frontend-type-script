import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { appsNames, site } from '../common';

@Injectable({
  providedIn: 'root',
})
export class SetAppNameService {
  constructor(private title: Title) {}

  setAppName = async (screen: string) => {
    const selectedScreen = screen.split('/')[4] || screen;
    const currentLang = localStorage.getItem(site.currentLangValue);
    let selectedApp = appsNames.findIndex(
      (co) => co.app?.toLowerCase() === selectedScreen?.toLowerCase(),
    );

    if (selectedApp === -1) {
      selectedApp = appsNames.findIndex(
        (el) => el.app.toLowerCase() === 'home',
      );
    }

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
