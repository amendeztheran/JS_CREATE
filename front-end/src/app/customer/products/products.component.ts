import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { Product } from '../interfaces/product.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/welcome/services/api.service';
import { environment } from 'src/environments/environments';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  baseUrl = environment.baseUrl
  categories: any[] = [];
  products: any[] = [];
  public listaProductos: any = []

  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2, private router: Router, private route: ActivatedRoute, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.llenarData();
    // Estilos del body
    this.renderer.setStyle(document.body, 'background-color', 'black');
    this.renderer.setStyle(document.body, 'justify-content', 'center');
    this.renderer.setStyle(document.body, 'align-items', 'center');
  }

  /*Search */
  public llenarData() {
    this.route.queryParams.subscribe(params => {
      const filter = params["filter"];
      if (filter) {
        this.apiService.getSearchProducts(filter).subscribe(
          (response) => {
            this.listaProductos = response;
          },
          error => {
            console.error('Error en la búsqueda:', error);
          }
        )
      } else {
        this.apiProductsAllService.get(`${this.baseUrl}/api/products`).subscribe(data => [
          this.listaProductos = data
        ]);
      }
    });
  }
  addToCart(product: Product) {
    return this.apiProductsAllService.addProduct(product);
  }
  productDetail(product: Product) {
    if (product.id_product) {
      this.router.navigate(['/products/detailsproducts', product.id_product])
    }
  }
}


