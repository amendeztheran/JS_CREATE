import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsAllService {
  baseApi = environment.baseUrl;
  //Lista Productos
  private myList: Product[] = [];
  //Carrito Observable
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();
  //para enviar al detalle de producto
  private productDet: any;
  public noStock:boolean=false;

  constructor(private http: HttpClient) {
    const carritoGuardado = localStorage.getItem('cart');
    if (carritoGuardado) {
      this.myList = JSON.parse(carritoGuardado);
      this.myCart.next(this.myList);
    }
  }
  public get(url: string) {
    return this.http.get(url);
  }
  getProductById(id: number) {
    return this.http.get(`${this.baseApi}/api/productbyid/${id}`);
  }
  // Método para establecer el objeto a compartir
  setProductDetails(product: any) {
    this.productDet = product;
  }
  // Método para obtener el objeto compartido
  getProductDetails() {
    return this.productDet;
  }
  //productos de mujeres
  getProductsByWoman() {
    return this.http.get(`${this.baseApi}/api/category/mujer`)
  }
  //traer los productos de hombres
  getProductsByMan() {
    return this.http.get(`${this.baseApi}/api/category/hombre`)
  };
  addProduct(product: Product) {
    const existingProduct = this.myList.find((element) => element.id_product === product.id_product);
    if (existingProduct) {
      // Si el producto ya existe en el carrito
      if (this.canAddUnitWithoutExceedingStock(existingProduct.id_product)) {
        existingProduct.cantidad = existingProduct.cantidad + product.cantidad;
        this.noStock=false;
      } else {
        console.log("No se puede agregar más cantidad. Stock máximo alcanzado.");
        this.noStock=true;
        console.log(this.noStock)

      }
    } else {
        this.myList.push(product);
        console.log("Producto agregado");

    }
    this.myCart.next(this.myList);
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }
  deleteProduct(id: number) {
    this.myList = this.myList.filter((product) => {
      return product.id_product != id
    })
    this.myCart.next(this.myList);
    // Guardar el carrito actualizado en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(this.myList));
    this.noStock=false;
  }
  findProductById(id: number) {
    return this.myList.find((element) => {
      return element.id_product === id;
    })
  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0);
    return total;
  }
  totalUnits() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad); }, 0);
    return total;
  }
  cartClear() {
    this.myList = [];
    localStorage.setItem('cart', JSON.stringify(this.myList));
    this.myCart.next(this.myList);
  }
  // Email: Método para obtener los productos del carrito
  getCartProducts(): Product[] {
    return this.myCart.getValue();
  }
  //saber si el carrito está vacío;
  isCartEmpty(): boolean {
    return this.myList.length === 0;
  };
  //obtener los productos del carro
  getCart(): Observable<Product[]> {
    return this.myCart.asObservable();
  };
  //no superar el total de los productos
  canAddUnitWithoutExceedingStock(productId: number): boolean {
    const product = this.findProductById(productId);
    return product ? product.cantidad + 1 <= product.quantify && product.quantify > 0 : false;
  }
  updateLS() {
    this.myCart.next(this.myList);
    localStorage.setItem('cart', JSON.stringify(this.myList));
  }
}
