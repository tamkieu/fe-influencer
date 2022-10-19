import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'influencer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'influencer';
  constructor(
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'vn']);
    translate.setDefaultLang('vn');
  }
}
