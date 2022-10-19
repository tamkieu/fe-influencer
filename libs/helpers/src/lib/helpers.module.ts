import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfRolesDirective } from './if-roles.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    IfRolesDirective
  ],
  exports: [
    IfRolesDirective
  ]
})
export class HelpersModule {}
