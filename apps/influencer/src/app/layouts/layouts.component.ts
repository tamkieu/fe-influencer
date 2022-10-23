import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticateService} from "@influencer/authenticate";
import {DataAccount, GetAccountByIdFacade, User} from "@influencer/api-client";
import {Subscription} from "rxjs";

@Component({
  selector: 'influencer-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit, OnDestroy {
  headerMode!: string;
  $isLogged = this.authenticateService.getAuthenticationAsOb;
  userProfile!: DataAccount;
  private subscriptions = new Subscription();

  constructor(
    private router: Router,
    private getAccountByIdFacade: GetAccountByIdFacade,
    private authenticateService: AuthenticateService) {
    this.$isLogged.subscribe(isLogged => {
      if(isLogged) {
        this.getAccountByIdFacade.init();
      }
    })
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getAccountByIdFacade.allGetAccountById$.subscribe(account => {
        this.userProfile = <DataAccount>account?.data;
      })
    )
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          switch (event.url) {
            case '/auth/login':
              this.headerMode = 'page-inline';
              break;
            case '/auth':
              this.headerMode = 'page-inline';
              break;
            case '/auth/register':
              this.headerMode = 'page-inline';
              break;
            default:
              this.headerMode = '';
              break;
          }
        }
      })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  logOut() {
    this.authenticateService.logout();
  }
}
