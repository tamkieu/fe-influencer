import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as GetAccountByIdActions from './get-account-by-id.actions';
import { GetAccountByIdEffects } from './get-account-by-id.effects';

describe('GetAccountByIdEffects', () => {
  let actions: Observable<Action>;
  let effects: GetAccountByIdEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        GetAccountByIdEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(GetAccountByIdEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GetAccountByIdActions.initGetAccountById() });

      const expected = hot('-a-|', {
        a: GetAccountByIdActions.loadGetAccountByIdSuccess({
          getAccountById: [],
        }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
