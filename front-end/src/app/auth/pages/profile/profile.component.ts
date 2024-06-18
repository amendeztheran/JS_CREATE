import { Component, OnInit, Renderer2 } from '@angular/core';
import { ApiProductsAllService } from '../../../customer/services/api-products-all.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public listaProductos: any = [];
  private readonly baseUrl: string = environment.baseUrl;
  constructor(private apiProductsAllService: ApiProductsAllService, private renderer: Renderer2) { }
  /*app - header*/
  ngOnInit(): void {
    this.llenarData();
    // Estilos del body
    this.renderer.setStyle(document.body, 'background-color', 'black');
    this.renderer.setStyle(document.body, 'justify-content', 'center');
    this.renderer.setStyle(document.body, 'align-items', 'center');
  }
  public llenarData() {
    this.apiProductsAllService.get(`${this.baseUrl}/api/products`).subscribe(data => [
      this.listaProductos = data
    ])
  }
}
