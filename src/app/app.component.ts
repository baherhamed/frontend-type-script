/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { site } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  site: any;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F12') {
      event.preventDefault();
    }
  }

  constructor(private translateService: TranslateService) {
    this.setLanguage();
  }

  async ngOnInit() {
    // site = site;
    // this.site.disableDeveloperTools();
  }

  setLanguage() {
    const currentLanguage = localStorage.getItem(site.currentLangValue);

    const htmlTag = document.querySelector('html');
    let setLang = '';
    if (!currentLanguage || currentLanguage === site.language.ar) {
      if (htmlTag) {
        htmlTag.setAttribute('dir', 'rtl');
        setLang = site.language.ar;
      }
    } else if (currentLanguage && currentLanguage === site.language.en) {
      if (htmlTag) {
        htmlTag.setAttribute('dir', 'ltr');
        setLang = site.language.en;
      }
    }
    this.translateService.setDefaultLang(setLang);
  }
}
