import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as AllInfluencersActions from './all-influencers.actions';
import { AllInfluencersEffects } from './all-influencers.effects';
import { AllInfluencersFacade } from './all-influencers.facade';
import { AllInfluencersEntity } from './all-influencers.models';
import {
  ALLINFLUENCERS_FEATURE_KEY,
  AllInfluencersState,
  initialAllInfluencersState,
  allInfluencersReducer,
} from './all-influencers.reducer';
import * as AllInfluencersSelectors from './all-influencers.selectors';

interface TestSchema {
  allInfluencers: AllInfluencersState;
}

describe('AllInfluencersFacade', () => {
  let facade: AllInfluencersFacade;
  let store: Store<TestSchema>;
  const createAllInfluencersEntity = (
    id: string,
    name = ''
  ): AllInfluencersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            ALLINFLUENCERS_FEATURE_KEY,
            allInfluencersReducer
          ),
          EffectsModule.forFeature([AllInfluencersEffects]),
        ],
        providers: [AllInfluencersFacade],
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
      facade = TestBed.inject(AllInfluencersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAllInfluencers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAllInfluencers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAllInfluencersSuccess` to manually update list
     */
    it('allAllInfluencers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAllInfluencers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AllInfluencersActions.loadAllInfluencersSuccess({
          allInfluencers: [
            createAllInfluencersEntity('AAA'),
            createAllInfluencersEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allAllInfluencers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
