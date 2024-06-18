// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public readonly cartProducts$: Observable<Product[]> = this.cartProductsSubject.asObservable();

  constructor() { }

  updateCartProducts(cartProducts: Product[]): void {
    this.cartProductsSubject.next(cartProducts);
  }
}