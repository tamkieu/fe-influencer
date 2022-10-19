import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutsComponent} from "./layouts.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {FlexLayoutModule} from "@angular/flex-layout";
import {NzInputModule} from "ng-zorro-antd/input";
import {RouterLink, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";



@NgModule({
    declarations: [
        LayoutsComponent
    ],
    exports: [
        LayoutsComponent
    ],
    imports: [
        CommonModule,
        NzButtonModule,
        NzLayoutModule,
        TranslateModule,
        NzMenuModule,
        FlexLayoutModule,
        NzInputModule,
        RouterOutlet,
        RouterLink,
        NzDropDownModule
    ]
})
export class LayoutsModule { }
