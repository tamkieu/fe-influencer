import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ALLINFLUENCERS_FEATURE_KEY,
  AllInfluencersState,
  allInfluencersAdapter,
} from './all-influencers.reducer';

// Lookup the 'AllInfluencers' feature state managed by NgRx
export const getAllInfluencersState =
  createFeatureSelector<AllInfluencersState>(ALLINFLUENCERS_FEATURE_KEY);

const { selectAll, selectEntities } = allInfluencersAdapter.getSelectors();

export const getAllInfluencersLoaded = createSelector(
  getAllInfluencersState,
  (state: AllInfluencersState) => state.loaded
);

export const getAllInfluencersError = createSelector(
  getAllInfluencersState,
  (state: AllInfluencersState) => state.error
);

export const getAllAllInfluencers = createSelector(
  getAllInfluencersState,
  (state: AllInfluencersState) => selectAll(state)
);

export const getAllInfluencersEntities = createSelector(
  getAllInfluencersState,
  (state: AllInfluencersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getAllInfluencersState,
  (state: AllInfluencersState) => state.selectedId
);

export const getSelected = createSelector(
  getAllInfluencersEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
