import { createAction, props } from '@ngrx/store';
import {AccountRes} from "../model/accountRes";

export const initGetAccountById = createAction(
  '[GetAccountById Page] Init'
);

export const loadGetAccountByIdSuccess = createAction(
  '[GetAccountById/API] Load GetAccountById Success',
  props<{ getAccountById: AccountRes }>()
);

export const loadGetAccountByIdFailure = createAction(
  '[GetAccountById/API] Load GetAccountById Failure',
  props<{ error: any }>()
);
