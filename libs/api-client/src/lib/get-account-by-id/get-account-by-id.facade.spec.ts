import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import { GetAccountByIdEffects } from './get-account-by-id.effects';
import { GetAccountByIdFacade } from './get-account-by-id.facade';
import { GetAccountByIdEntity } from './get-account-by-id.models';
import {
  GETACCOUNTBYID_FEATURE_KEY,
  GetAccountByIdState,
  initialGetAccountByIdState,
  getAccountByIdReducer,
} from './get-account-by-id.reducer';
import * as GetAccountByIdSelectors from './get-account-by-id.selectors';

interface TestSchema {
  getAccountById: GetAccountByIdState;
}

describe('GetAccountByIdFacade', () => {
  let facade: GetAccountByIdFacade;
  let store: Store<TestSchema>;
  const createGetAccountByIdEntity = (
    id: string,
    name = ''
  ): GetAccountByIdEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            GETACCOUNTBYID_FEATURE_KEY,
            getAccountByIdReducer
          ),
          EffectsModule.forFeature([GetAccountByIdEffects]),
        ],
        providers: [GetAccountByIdFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GetAccountByIdFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGetAccountById$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGetAccountById$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGetAccountByIdSuccess` to manually update list
     */
    it('allGetAccountById$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGetAccountById$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GetAccountByIdActions.loadGetAccountByIdSuccess({
          getAccountById: [
            createGetAccountByIdEntity('AAA'),
            createGetAccountByIdEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allGetAccountById$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
