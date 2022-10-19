import { AllInfluencersEntity } from './all-influencers.models';
import {
  allInfluencersAdapter,
  AllInfluencersPartialState,
  initialAllInfluencersState,
} from './all-influencers.reducer';
import * as AllInfluencersSelectors from './all-influencers.selectors';

describe('AllInfluencers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAllInfluencersId = (it: AllInfluencersEntity) => it.id;
  const createAllInfluencersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AllInfluencersEntity);

  let state: AllInfluencersPartialState;

  beforeEach(() => {
    state = {
      allInfluencers: allInfluencersAdapter.setAll(
        [
          createAllInfluencersEntity('PRODUCT-AAA'),
          createAllInfluencersEntity('PRODUCT-BBB'),
          createAllInfluencersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAllInfluencersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('AllInfluencers Selectors', () => {
    it('getAllAllInfluencers() should return the list of AllInfluencers', () => {
      const results = AllInfluencersSelectors.getAllAllInfluencers(state);
      const selId = getAllInfluencersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = AllInfluencersSelectors.getSelected(
        state
      ) as AllInfluencersEntity;
      const selId = getAllInfluencersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getAllInfluencersLoaded() should return the current "loaded" status', () => {
      const result = AllInfluencersSelectors.getAllInfluencersLoaded(state);

      expect(result).toBe(true);
    });

    it('getAllInfluencersError() should return the current "error" state', () => {
      const result = AllInfluencersSelectors.getAllInfluencersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
