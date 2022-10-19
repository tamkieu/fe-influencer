import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuardNotLoggedIn} from "./core/authGuard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LayoutsModule} from "./layouts/layouts-module";
import {BasicAuthInterceptor} from "./core/basic-auth.interceptor";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";
import {NxModule} from "@nrwl/angular";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./influencers').then((m) => m.InfluencersModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth').then((m) => m.AuthModule),
    canActivate: [AuthGuardNotLoggedIn],
  },
];

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload',
    }),
    BrowserAnimationsModule,
    LayoutsModule,
    HttpClientModule,
    NxModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    AuthGuardNotLoggedIn,
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
