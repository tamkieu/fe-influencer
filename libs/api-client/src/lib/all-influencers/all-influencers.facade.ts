import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AllInfluencersActions from './all-influencers.actions';
import * as AllInfluencersFeature from './all-influencers.reducer';
import * as AllInfluencersSelectors from './all-influencers.selectors';

@Injectable()
export class AllInfluencersFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(AllInfluencersSelectors.getAllInfluencersLoaded)
  );
  allAllInfluencers$ = this.store.pipe(
    select(AllInfluencersSelectors.getAllAllInfluencers)
  );
  selectedAllInfluencers$ = this.store.pipe(
    select(AllInfluencersSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(page: number, size: number) {
    this.store.dispatch(AllInfluencersActions.initAllInfluencers({page: page, size: size}));
  }
}
