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
import {BASE_PATH} from "./variables";
import { environment } from '@env/environment';
import {UserResourceService} from "./api/userResource.service";

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromAllInfluencers.ALLINFLUENCERS_FEATURE_KEY,
      fromAllInfluencers.allInfluencersReducer
    ),
    EffectsModule.forFeature([AllInfluencersEffects]),
  ],
  declarations: [],
  exports: [],
  providers: [
    InfluencerResourceService,
    AllInfluencersFacade,
    UserResourceService,
    { provide: BASE_PATH, useValue: environment.apiClient },
  ],
})
export class ApiClientModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<ApiClientModule> {
    return {
      ngModule: ApiClientModule,
      providers: [],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiClientModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'ApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
