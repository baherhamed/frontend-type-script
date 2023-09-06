import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { componentsNames, site } from '../common';

@Injectable({
  providedIn: 'root',
})
export class SetComponentNameService {
  constructor(private title: Title) {}

  setComponentName = async (screen: string) => {
    const currentLang = localStorage.getItem(site.currentLangValue);
    const selectedComponent = componentsNames.findIndex((co) =>
      screen
        ? co.component?.toLowerCase() === screen?.toLowerCase() ||
          co.en?.toLowerCase() === screen.toLowerCase() ||
          co.ar?.toLowerCase() === screen.toLowerCase()
        : componentsNames.findIndex((el) => el.component === 'home'),
    );

    let data;
    if (!currentLang || currentLang === site.language.ar) {
      this.title.setTitle(String(componentsNames[selectedComponent]?.ar));
      data = String(componentsNames[selectedComponent]?.ar);
    } else if (currentLang === site.language.en) {
      this.title.setTitle(String(componentsNames[selectedComponent]?.en));
      data = String(componentsNames[selectedComponent]?.en);
    }

    return data;
  };
}
