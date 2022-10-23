import { GetAccountByIdEntity } from './get-account-by-id.models';
import {
  getAccountByIdAdapter,
  GetAccountByIdPartialState,
  initialGetAccountByIdState,
} from './get-account-by-id.reducer';
import * as GetAccountByIdSelectors from './get-account-by-id.selectors';

describe('GetAccountById Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGetAccountByIdId = (it: GetAccountByIdEntity) => it.id;
  const createGetAccountByIdEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GetAccountByIdEntity);

  let state: GetAccountByIdPartialState;

  beforeEach(() => {
    state = {
      getAccountById: getAccountByIdAdapter.setAll(
        [
          createGetAccountByIdEntity('PRODUCT-AAA'),
          createGetAccountByIdEntity('PRODUCT-BBB'),
          createGetAccountByIdEntity('PRODUCT-CCC'),
        ],
        {
          ...initialGetAccountByIdState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('GetAccountById Selectors', () => {
    it('getAllGetAccountById() should return the list of GetAccountById', () => {
      const results = GetAccountByIdSelectors.getAllGetAccountById(state);
      const selId = getGetAccountByIdId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GetAccountByIdSelectors.getSelected(
        state
      ) as GetAccountByIdEntity;
      const selId = getGetAccountByIdId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGetAccountByIdLoaded() should return the current "loaded" status', () => {
      const result = GetAccountByIdSelectors.getGetAccountByIdLoaded(state);

      expect(result).toBe(true);
    });

    it('getGetAccountByIdError() should return the current "error" state', () => {
      const result = GetAccountByIdSelectors.getGetAccountByIdError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
