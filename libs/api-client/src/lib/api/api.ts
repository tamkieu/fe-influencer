export * from './influencerResource.service';
export * from './userResource.service';
import { InfluencerResourceService } from './influencerResource.service';
import { UserResourceService } from './userResource.service';
export const APIS = [InfluencerResourceService, UserResourceService];
