import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import * as GetAccountByIdFeature from './get-account-by-id.reducer';
import {map} from "rxjs";
import * as AllInfluencersActions from "../all-influencers/all-influencers.actions";
import {AccountResourceService} from "../api/accountResource.service";

@Injectable()
export class GetAccountByIdEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAccountByIdActions.initGetAccountById),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.accountResourceService
            .getAccount()
            .pipe(
              map((result) =>
                GetAccountByIdActions.loadGetAccountByIdSuccess({
                  getAccountById: result,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return GetAccountByIdActions.loadGetAccountByIdFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private accountResourceService: AccountResourceService
  ) {}
}
