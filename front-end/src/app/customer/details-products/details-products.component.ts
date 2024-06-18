import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { Product } from '../interfaces/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css']
})

export class DetailsProductsComponent implements OnInit {

  product: any;
  loadedData: boolean = false;
  caracteristicasOK: boolean = true;
  productSelected: any;
  colorSeleccionado: string = '';
  tallaSeleccionada: string = '';
  /* Cantidad */
  numero: number = 1

  // public listaProductos:any =[]
  public colors: any = [];
  public tallas: any = [];

  noStock: boolean = false;

  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2, private route: ActivatedRoute) { 
  }

  /*app - header*/
  ngOnInit(): void {
    // Estilos del body
    this.renderer.setStyle(document.body, 'background-color', 'black');
    this.renderer.setStyle(document.body, 'justify-content', 'center');
    this.renderer.setStyle(document.body, 'align-items', 'center');
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiProductsAllService.getProductById(id).subscribe((res: any) => {
      this.product = res[0]
      this.colors = this.product.colors
      this.tallas = this.product.sizes
      this.loadedData = true
    })
  }
  getColorKeys() {
    return Object.keys(this.colors);
  }
  getTallasKeys() {
    return Object.keys(this.tallas);
  }
  selectedColor(color: string) {
    this.colorSeleccionado = color;
    this.checkValues();
  }
  ontallaChange(event: any) {
    this.tallaSeleccionada = event.target.value;
    this.checkValues();
  }
  checkValues() {
    if (this.tallaSeleccionada !== '' && this.colorSeleccionado !== '') {
      this.caracteristicasOK = false;
    } else {
      this.caracteristicasOK = true;
    }
  }
  exceedingStock(Product: any): boolean {
    const existingProduct = this.apiProductsAllService.findProductById(Product.id_product)
    if (existingProduct) {
      const aux = existingProduct.cantidad + this.numero;
      if (aux < Product.quantify) {
        return false
      } else {
        return true
      }
    } else {
      if (this.numero < Product.quantify) {
        return false
      } else {
        return true
      }
    }
    return true
  }
  noNegative() {
    if (this.numero <= 1) {
      return true
    } else {
      return false
    }
  }

  addToCart(product: Product) {

    this.productSelected = {

      "brand_product": product.brand_product,
      "cantidad": this.numero,
      "color": this.colorSeleccionado,
      "descrip": product.descrip,
      "id_product": product.id_product,
      "price": product.price,
      "quantify": product.quantify,
      "size": this.tallaSeleccionada,
      "title": product.title,
      "url": product.url
    }
    return this.apiProductsAllService.addProduct(this.productSelected);
  }

  sinStock() {
    this.noStock = this.apiProductsAllService.noStock;
    console.log(this.noStock)
  }

  cambiarEstado() {
    this.noStock = false
  }
}