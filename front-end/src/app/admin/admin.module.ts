import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule  } from "./admin-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AdminSharedModule } from "../admin-shared/admin-shared.module";
import { CrudProductsComponent } from "./crud-products/crud-products.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [
        CrudProductsComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        AdminSharedModule,
        RouterModule
    ]
})

export class AdminModule { }