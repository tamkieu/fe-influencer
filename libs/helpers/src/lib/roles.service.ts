import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AuthenticateService} from "@influencer/authenticate";
import {User} from "@influencer/api-client";

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  $isLogged = this.authenticateService.getAuthenticationAsOb;
  userProfile!: User;

  constructor(
    private authenticateService: AuthenticateService
  ) {
    this.$isLogged.subscribe(isLogged => {
      if(isLogged) this.userProfile = this.authenticateService.getUser();
    })
  }

  /**
   * gets the user role
   */
  public roles(): Observable<{ roles: string[] }> {
    return of({roles: [this.userProfile?.role ? this.userProfile?.role: '']});
  }

}
