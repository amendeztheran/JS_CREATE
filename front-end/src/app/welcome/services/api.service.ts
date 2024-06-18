import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlSearch = environment.baseUrl;  //Search, descomentar.
  constructor(private http: HttpClient) { }
  public get(url: string) {
    return this.http.get(url);
  }

  getSearchProducts(title: string) {
    return this.http.get(`${this.urlSearch}/api/search/${title}`);
  }
}
