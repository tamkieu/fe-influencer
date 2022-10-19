import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfluencersComponent} from "./influencers.component";
import {InfluencersModuleRouting} from "./influencers.module.routing";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconDefinition} from "@ant-design/icons-angular";
import {CheckOutline, SaveOutline, WarningFill} from "@ant-design/icons-angular/icons";
import {ApiClientModule} from "@influencer/api-client";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzMessageModule} from "ng-zorro-antd/message";
import {HelpersModule} from "@influencer/helpers";

const icons: IconDefinition[] = [
  SaveOutline,
  CheckOutline,
  WarningFill
];

@NgModule({
  declarations: [
    InfluencersComponent
  ],
  imports: [
    CommonModule,
    InfluencersModuleRouting,
    FlexLayoutModule,
    NzTableModule,
    FormsModule,
    NzPopconfirmModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
    ApiClientModule,
    ReactiveFormsModule,
    NzFormModule,
    NzResultModule,
    NzMessageModule,
    HelpersModule
  ]
})
export class InfluencersModule { }
