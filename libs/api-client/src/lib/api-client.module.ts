import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { InfluencerResourceService } from './api/influencerResource.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAllInfluencers from './all-influencers/all-influencers.reducer';
import { AllInfluencersEffects } from './all-influencers/all-influencers.effects';
import { AllInfluencersFacade } from './all-influencers/all-influencers.facade';
import { BASE_PATH } from './variables';
import { environment } from '@env/environment';
import { UserResourceService } from './api/userResource.service';
import * as fromGetAccountById from './get-account-by-id/get-account-by-id.reducer';
import { GetAccountByIdEffects } from './get-account-by-id/get-account-by-id.effects';
import { GetAccountByIdFacade } from './get-account-by-id/get-account-by-id.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromAllInfluencers.ALLINFLUENCERS_FEATURE_KEY,
      fromAllInfluencers.allInfluencersReducer
    ),
    EffectsModule.forFeature([AllInfluencersEffects]),
    StoreModule.forFeature(
      fromGetAccountById.GETACCOUNTBYID_FEATURE_KEY,
      fromGetAccountById.getAccountByIdReducer
    ),
    EffectsModule.forFeature([GetAccountByIdEffects]),
  ],
  declarations: [],
  exports: [],
  providers: [
    InfluencerResourceService,
    AllInfluencersFacade,
    UserResourceService,
    { provide: BASE_PATH, useValue: environment.apiClient },
    GetAccountByIdFacade,
  ],
})
export class ApiClientModule {

}
