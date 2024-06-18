import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { DetailsProductsComponent } from './details-products/details-products.component';
import { WomanComponent } from './filter/woman/woman.component';
import { ManComponent } from './filter/man/man.component';
import { TemplateComponent } from './template/template.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'detailsproducts/:id',
    component: DetailsProductsComponent
  },
  {
    path: 'woman',
    component: WomanComponent
  },
  {
    path: 'man',
    component: ManComponent
  },
  {/*Plantilla email */
    path: 'template',
    component: TemplateComponent
  }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerRoutingModule { }
