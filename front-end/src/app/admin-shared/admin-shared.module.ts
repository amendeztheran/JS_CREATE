import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";
import { ListProductsComponent } from "./list-products/list-products.component";
import { AddEditProductComponent } from "./add-edit-product/add-edit-product.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ProgressBarComponent } from "./progress-bar/progress-bar.component";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    declarations: [
        NavbarComponent,
        ListProductsComponent,
        AddEditProductComponent,
        ProgressBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        NavbarComponent,
        ListProductsComponent
    ]
})

export class AdminSharedModule { }