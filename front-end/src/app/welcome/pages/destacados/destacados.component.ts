import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Product } from 'src/app/customer/interfaces/product.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-destacados',
  templateUrl: './destacados.component.html',
  styleUrls: ['./destacados.component.css']
})
export class DestacadosComponent implements OnInit {
  public listaProductos: any = []
  baseUrl = environment.baseUrl;
  constructor(private apiService: ApiService, private router: Router) { }
  ngOnInit(): void {
    this.llenarData();
  }
  public llenarData() {
    this.apiService.get(`${this.baseUrl}/api/destacados`).subscribe(data => [
      this.listaProductos = data
    ])
  }
  productDetail(product: Product) {
    if (product.id_product) {
      this.router.navigate(['/products/detailsproducts', product.id_product])
    }
  }
  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "infinite": true,
    "nextArrow": false,
    "prevArrow": false,
    "responsive": [
      {
        "breakpoint": 992,
        "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 1,
          "arrows": true,
          "infinite": true
        }
      },
      {
        "breakpoint": 768,
        "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
          "arrows": true,
          "infinite": true
        }
      }
    ]
  };
}
