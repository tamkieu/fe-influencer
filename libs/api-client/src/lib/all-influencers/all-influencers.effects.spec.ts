import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AllInfluencersActions from './all-influencers.actions';
import { AllInfluencersEffects } from './all-influencers.effects';

describe('AllInfluencersEffects', () => {
  let actions: Observable<Action>;
  let effects: AllInfluencersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AllInfluencersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AllInfluencersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AllInfluencersActions.initAllInfluencers() });

      const expected = hot('-a-|', {
        a: AllInfluencersActions.loadAllInfluencersSuccess({
          allInfluencers: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
