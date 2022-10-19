import { Action } from '@ngrx/store';

import * as AllInfluencersActions from './all-influencers.actions';
import { AllInfluencersEntity } from './all-influencers.models';
import {
  AllInfluencersState,
  initialAllInfluencersState,
  allInfluencersReducer,
} from './all-influencers.reducer';

describe('AllInfluencers Reducer', () => {
  const createAllInfluencersEntity = (
    id: string,
    name = ''
  ): AllInfluencersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid AllInfluencers actions', () => {
    it('loadAllInfluencersSuccess should return the list of known AllInfluencers', () => {
      const allInfluencers = [
        createAllInfluencersEntity('PRODUCT-AAA'),
        createAllInfluencersEntity('PRODUCT-zzz'),
      ];
      const action = AllInfluencersActions.loadAllInfluencersSuccess({
        allInfluencers,
      });

      const result: AllInfluencersState = allInfluencersReducer(
        initialAllInfluencersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = allInfluencersReducer(initialAllInfluencersState, action);

      expect(result).toBe(initialAllInfluencersState);
    });
  });
});
