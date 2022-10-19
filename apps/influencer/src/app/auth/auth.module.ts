import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthRoutingModule} from "./auth.module.routing";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {IconDefinition} from "@ant-design/icons-angular";
import {LockOutline, MailOutline, PhoneOutline, UserOutline} from "@ant-design/icons-angular/icons";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";


const icons: IconDefinition[] = [
  UserOutline,
  LockOutline,
  PhoneOutline,
  MailOutline
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule.forChild(icons),
    NzMessageModule,
    NzModalModule,
    NzSelectModule
  ],
  providers: []
})
export class AuthModule { }
