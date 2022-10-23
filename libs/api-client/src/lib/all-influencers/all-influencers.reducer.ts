import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AllInfluencersActions from './all-influencers.actions';
import { AllInfluencersEntity } from './all-influencers.models';
import {Influencer, InfluencerRes} from "../model/influencer";

export const ALLINFLUENCERS_FEATURE_KEY = 'allInfluencers';

export interface AllInfluencersState extends InfluencerRes {
  selectedId?: string | number; // which AllInfluencers record has been selected
  loaded: boolean; // has the AllInfluencers list been loaded
  error?: string | null; // last known error (if any)
}

export interface AllInfluencersPartialState {
  readonly [ALLINFLUENCERS_FEATURE_KEY]: AllInfluencersState;
}

export const allInfluencersAdapter: EntityAdapter<InfluencerRes> =
  createEntityAdapter<InfluencerRes>();

export const initialAllInfluencersState: AllInfluencersState =
  allInfluencersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    success: false,
    message: ''
  });

const reducer = createReducer(
  initialAllInfluencersState,
  on(AllInfluencersActions.initAllInfluencers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    AllInfluencersActions.loadAllInfluencersSuccess,
    (state, { allInfluencers }) => ({
      ...state,
      ...allInfluencers,
      loaded: true,
    })
  ),
  on(AllInfluencersActions.loadAllInfluencersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function allInfluencersReducer(
  state: AllInfluencersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
