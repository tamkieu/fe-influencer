import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import * as GetAccountByIdFeature from './get-account-by-id.reducer';
import * as GetAccountByIdSelectors from './get-account-by-id.selectors';
import {getSelectedAccount} from "./get-account-by-id.selectors";

@Injectable()
export class GetAccountByIdFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(GetAccountByIdSelectors.getGetAccountByIdLoaded)
  );
  allGetAccountById$ = this.store.pipe(
    select(GetAccountByIdSelectors.getAllGetAccountById)
  );
  selectedGetAccountById$ = this.store.pipe(
    select(GetAccountByIdSelectors.getSelectedAccount)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(GetAccountByIdActions.initGetAccountById());
  }
}
