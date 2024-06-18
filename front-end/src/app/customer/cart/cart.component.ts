import { Component, OnInit } from '@angular/core';
import { OrderCartService } from '../services/order-cart.service';
import { ApiProductsAllService } from '../services/api-products-all.service';
import { environment } from 'src/environments/environments';
import { DialogService } from '../services/dialog.service';
import { CartService } from '../services/cart.service';/*View productos carrito en plantilla email de button confirmar: 2 */

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  baseUrl = environment.baseUrl;
  public listaProductos: any = [];
  /*Productos en el carrito */
  myCart$ = this.productsAllService.myCart$;
  orderlist: any = [];
  /*Email */
  viewEmail: boolean = false;
  up: boolean = true;
  /*Email: Detalles del carrito del cliente */
  constructor(private productsAllService: ApiProductsAllService, private dialogService: DialogService, private Order: OrderCartService, private cartService: CartService) { }
  ngOnInit(): void {
     /*View productos carrito en plantilla email de button confirmar: 1 */
     this.loadCart();
  }
  /*View productos carrito en plantilla email de button confirmar: 3 */
  loadCart() {
    const cartProducts = this.productsAllService.getCartProducts();
    this.cartService.updateCartProducts(cartProducts);
  }
  totalProducts(price: number, units: number) {
    return price * units;
  };
  deleteProduct(id: number) {
    this.productsAllService.deleteProduct(id);
  };
  updateUnits(operation: string, id: number) {
    const product = this.productsAllService.findProductById(id);
    if (product) {
      if (operation === "minus" && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
        // funcion para actualizar en el localStorage
        this.productsAllService.updateLS()
      }//el metodo de la api impide que se agregue una cantidad
      //mayor a la existente
      if (operation === "add" && this.productsAllService.canAddUnitWithoutExceedingStock(id)) {
        product.cantidad = product.cantidad + 1;
        // funcion paa actualiza en el localStorage
        this.productsAllService.updateLS()
      }
      if (product.cantidad === 0) {
        this.deleteProduct(id);
      }
    }
  };
  totalCart() {
    const result = this.productsAllService.totalCart();
    return result;
  };
  //no exceder el límite de cantidad establecida
  canAddUnitWithoutExceedingStock(productId: number): boolean {
    return this.productsAllService.canAddUnitWithoutExceedingStock(productId);
  }
  //saber si el carrito está vacío
  get isCartEmpty() {
    return this.productsAllService.isCartEmpty();
  };

  /* Valid button "ir a pagar" */
  validCart(){
    const token = localStorage.getItem('token');
    return !this.isCartEmpty && this.totalCart()>0 &&  token!= null
  }

  //obtener los productos
  getProducts() {
    this.productsAllService.get(`${this.baseUrl}/api/products`).subscribe(data => [
      this.listaProductos = data,
    ])
  };
  /* Ventana dialogo email */
  onToggleEmail(){
    /*Lógica alert iniciar sesión y productos en el carrito.  */
    if(this.isCartEmpty){
      alert('No existen productos en el carrito')
    }
    else if(this.validCart()){
      this.viewEmail = !this.viewEmail
    } else {
      alert('Por favor, iniciar sesión.')
    }
    
    /* */

  }
  /*Cerrar la ventana de Email */
  closeModal(): void {
    this.viewEmail = false;
  }
  openDialogCustom() {
    this.dialogService.openDialogCustom()
  };
  
}
