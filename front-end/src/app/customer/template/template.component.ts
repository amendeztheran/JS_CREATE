import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Product } from '../interfaces/product.interface'; /*View productos carrito: 2 */
import { CartService } from '../services/cart.service';/*View productos carrito: 3 */
import { AddressService } from '../services/address.service';/*Dirección de residencia: 2 */
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  /*Nombre del usuario */
  username: string = '';

  /*View productos carrito: 1 */
  cartProducts: Product[] = [];

  /*Dirección de residencia: 1 */
  customerAddress: string = '';

  /*Valor total pedidos table "resumen de pedidos": 1*/
  totalOrder: number = 0;

  constructor(public authService: AuthService, private cartService: CartService, private addressService: AddressService, private router: Router) {
    /*Nombre del usuario */
    this.username = this.authService.getUsername;
  }

  /*Botón template para redireccionar a página principal */
  redirectTemplateToHome() {
    this.router.navigateByUrl('#')
  }

  ngOnInit(): void {
    /*View productos carrito: 4 */
    this.cartService.cartProducts$.subscribe(cartProducts => {
      this.cartProducts = cartProducts;
      /*Valor total pedidos table "resumen de pedidos": 2*/
      this.calculateTotalOrder(); /*Calcular el total al actualizar los productos del carrito*/
    });
    /*Dirección de residencia: 3 */
    this.addressService.getCustomerAddress().subscribe(address => {
      this.customerAddress = address; /* Actualizar la dirección del cliente*/
    });
  }
  /*View productos carrito: 5 */
  updateCartProducts(cartProducts: Product[]) {
    this.cartProducts = cartProducts;
  }
  /*Valor total pedidos table "resumen de pedidos": 3*/
  calculateTotalOrder(): void {
    this.totalOrder = this.cartProducts.reduce((total, product) => total + (product.price * product.cantidad), 0);
  }
}
