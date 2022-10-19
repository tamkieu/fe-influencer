import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AuthenticateService} from "@influencer/authenticate";
import {User} from "@influencer/api-client";

@Component({
  selector: 'influencer-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  headerMode!: string;
  $isLogged = this.authenticateService.getAuthenticationAsOb;
  userProfile!: User;

  constructor(
    private router: Router,
    private authenticateService: AuthenticateService) {
    this.$isLogged.subscribe(isLogged => {
      if(isLogged) this.userProfile = this.authenticateService.getUser();
    })
  }

  ngOnInit(): void {
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

  logOut() {
    this.authenticateService.logout();
  }
}
