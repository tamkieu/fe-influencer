import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfRolesDirective } from './if-roles.directive';
import {ApiClientModule} from "@influencer/api-client";

@NgModule({
  imports: [CommonModule, ApiClientModule],
  declarations: [
    IfRolesDirective
  ],
  exports: [
    IfRolesDirective
  ]
})
export class HelpersModule {}
