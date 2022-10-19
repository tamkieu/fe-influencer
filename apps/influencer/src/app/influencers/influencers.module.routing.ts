import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import {InfluencersComponent} from "./influencers.component";

const routes: Routes = [
    {
        path: '',
        component: InfluencersComponent,
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InfluencersModuleRouting {}
