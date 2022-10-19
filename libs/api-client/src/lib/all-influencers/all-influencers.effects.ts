import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as AllInfluencersActions from './all-influencers.actions';
import * as AllInfluencersFeature from './all-influencers.reducer';
import {InfluencerResourceService} from "@influencer/api-client";
import {map} from "rxjs";

@Injectable()
export class AllInfluencersEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllInfluencersActions.initAllInfluencers),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.influencerResourceService
            .getAllInfluencers(
              action.page,
              action.size,
            )
            .pipe(
              map((result) =>
                AllInfluencersActions.loadAllInfluencersSuccess({
                  allInfluencers: result,
                })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return AllInfluencersActions.loadAllInfluencersFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private influencerResourceService: InfluencerResourceService
    ) {}
}
