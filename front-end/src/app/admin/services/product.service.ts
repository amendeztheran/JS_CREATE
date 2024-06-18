import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { productsInterface } from '../interfaces/products-interfaces.module';

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.baseUrl;/* Conectar al servidor */
    this.myApiUrl = '/api/products/' /* Obtener lista de productos visualizar*/
  }

  /* Obtener lista de productos visualizar */
  getListProducts(): Observable<productsInterface[]>{
    return this.http.get<productsInterface[]>(`${this.myAppUrl}${this.myApiUrl}`)
  } 

  /*Eliminar producto */
  deleteProduct(id_product: number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id_product}`)
  }

  /*Añadir producto */
  saveProduct(product: productsInterface): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,product)
  }
  
  /*Actualizar producto */
  getProductUpdate(id_product: number): Observable<productsInterface>{
    return this.http.get<productsInterface>(`${this.myAppUrl}${this.myApiUrl}${id_product}`)
  }

  updateProduct(id_product: number, product: productsInterface): Observable<void>{
    return this.http.patch<void>(`${this.myAppUrl}${this.myApiUrl}${id_product}`, product)
  }

}