import { Action } from '@ngrx/store';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import { GetAccountByIdEntity } from './get-account-by-id.models';
import {
  GetAccountByIdState,
  initialGetAccountByIdState,
  getAccountByIdReducer,
} from './get-account-by-id.reducer';

describe('GetAccountById Reducer', () => {
  const createGetAccountByIdEntity = (
    id: string,
    name = ''
  ): GetAccountByIdEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid GetAccountById actions', () => {
    it('loadGetAccountByIdSuccess should return the list of known GetAccountById', () => {
      const getAccountById = [
        createGetAccountByIdEntity('PRODUCT-AAA'),
        createGetAccountByIdEntity('PRODUCT-zzz'),
      ];
      const action = GetAccountByIdActions.loadGetAccountByIdSuccess({
        getAccountById,
      });

      const result: GetAccountByIdState = getAccountByIdReducer(
        initialGetAccountByIdState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = getAccountByIdReducer(initialGetAccountByIdState, action);

      expect(result).toBe(initialGetAccountByIdState);
    });
  });
});
