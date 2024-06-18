import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from '../admin-shared/add-edit-product/add-edit-product.component';
import { CrudProductsComponent } from './crud-products/crud-products.component';

const routes: Routes =[
  {
    path:'crudproducts',
    component:CrudProductsComponent
  },
  {
    path: 'add',
    component: AddEditProductComponent
  },
  {
    path: 'edit/:id',
    component: AddEditProductComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }/*Redireccionar a página home administrador si no existe */
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminRoutingModule { }