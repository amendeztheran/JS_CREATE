import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private customerAddressSubject = new BehaviorSubject<string>('');

  constructor() {}

  updateCustomerAddress(address: string) {
    this.customerAddressSubject.next(address);
  }

  getCustomerAddress() {
    return this.customerAddressSubject.asObservable();
  }
}