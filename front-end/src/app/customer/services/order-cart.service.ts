import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { OrderHeader } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})

export class OrderCartService {
  private apiUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  createOrderHeader(orderData: OrderHeader): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/order`, orderData);
  }
  createOrderDetail(orderDataDetail: any, address: String): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const data = {
      address: address,
      orderData: orderDataDetail
    }
    return this.http.post(`${this.apiUrl}/api/orderheader`, data, { headers: headers });
  }
}
