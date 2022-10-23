import { createAction, props } from '@ngrx/store';
import {InfluencerRes} from "../model/influencer";

export const initAllInfluencers = createAction(
  '[AllInfluencers Page] Init',
  props<{page: number, size: number}>()
);

export const loadAllInfluencersSuccess = createAction(
  '[AllInfluencers/API] Load AllInfluencers Success',
  props<{ allInfluencers: InfluencerRes }>()
);

export const loadAllInfluencersFailure = createAction(
  '[AllInfluencers/API] Load AllInfluencers Failure',
  props<{ error: any }>()
);
