import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GETACCOUNTBYID_FEATURE_KEY,
  GetAccountByIdState,
  getAccountByIdAdapter,
} from './get-account-by-id.reducer';

// Lookup the 'GetAccountById' feature state managed by NgRx
export const getGetAccountByIdState =
  createFeatureSelector<GetAccountByIdState>(GETACCOUNTBYID_FEATURE_KEY);

const { selectAll, selectEntities } = getAccountByIdAdapter.getSelectors();

export const getGetAccountByIdLoaded = createSelector(
  getGetAccountByIdState,
  (state: GetAccountByIdState) => state.loaded
);

export const getGetAccountByIdError = createSelector(
  getGetAccountByIdState,
  (state: GetAccountByIdState) => state.error
);

export const getAllGetAccountById = createSelector(
  getGetAccountByIdState,
  (state: GetAccountByIdState) => (state)
);

export const getGetAccountByIdEntities = createSelector(
  getGetAccountByIdState,
  (state: GetAccountByIdState) => (state)
);

export const getSelectedAccountId = createSelector(
  getGetAccountByIdState,
  (state: GetAccountByIdState) => state.selectedId
);

export const getSelectedAccount = createSelector(
  getGetAccountByIdEntities,
  getSelectedAccountId,
  (entities, selectedId) => selectedId && entities
);
