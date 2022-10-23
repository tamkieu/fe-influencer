import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import { GetAccountByIdEntity } from './get-account-by-id.models';
import {AccountRes} from "../model/accountRes";

export const GETACCOUNTBYID_FEATURE_KEY = 'getAccountById';

export interface GetAccountByIdState extends AccountRes {
  selectedId?: string | number; // which GetAccountById record has been selected
  loaded: boolean; // has the GetAccountById list been loaded
  error?: string | null; // last known error (if any)
}

export interface GetAccountByIdPartialState {
  readonly [GETACCOUNTBYID_FEATURE_KEY]: GetAccountByIdState;
}

export const getAccountByIdAdapter: EntityAdapter<AccountRes> =
  createEntityAdapter<AccountRes>();

export const initialGetAccountByIdState: GetAccountByIdState =
  getAccountByIdAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    success: false,
    message: ''
  });

const reducer = createReducer(
  initialGetAccountByIdState,
  on(GetAccountByIdActions.initGetAccountById, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    GetAccountByIdActions.loadGetAccountByIdSuccess,
    (state, { getAccountById }) => ({
      ...state,
      ...getAccountById,
      loaded: true,
    })
  ),
  on(GetAccountByIdActions.loadGetAccountByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function getAccountByIdReducer(
  state: GetAccountByIdState | undefined,
  action: Action
) {
  return reducer(state, action);
}
