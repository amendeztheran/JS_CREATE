import { Component, OnInit } from '@angular/core';
import { productsInterface } from 'src/app/admin/interfaces/products-interfaces.module';
import { ProductService } from 'src/app/admin/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  //Array
  listProducts: productsInterface[]= [ /* Objeto */
    /*Parametros*/]
  loading: boolean = false;
  constructor(private _productService : ProductService, private toastr: ToastrService){ }
  ngOnInit(): void { 
    this.getListProducts();
  }
  /*Obtener lista de productos visualizar */
  getListProducts(){
    this.loading = true;
    this._productService.getListProducts().subscribe((data: productsInterface[]) => {
      console.log(data);
      this.listProducts = data; /* Respuesta del servicio, leer los productos servidor back end de mySql */
      this.loading = false;
    })
  }
  /*Eliminar producto */
  deleteProduct(id_product: number){
    console.log('ID del producto a eliminar:',id_product);
    this.loading = true;
    this._productService.deleteProduct(id_product).subscribe(() => {
      this.getListProducts(); //Vuele a mostrar la lista de productos
      this.toastr.warning('El producto fue eliminado con exito.', 'Producto eliminado' ,{
        tapToDismiss: true,
        closeButton: true
      });
    },
    (error) => {
      if (error instanceof HttpErrorResponse && error.status === 200) {
        // Si la respuesta es 200 (OK), pero no es un JSON válido, simplemente ignóralo
        console.warn('Respuesta del servidor no es un JSON válido:', error.statusText);
        this.getListProducts();
      } else {
        console.error('Error al eliminar el producto:', error);
        this.loading = false;
      }
    })
  }

}
