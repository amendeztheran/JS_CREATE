import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { productsInterface } from 'src/app/admin/interfaces/products-interfaces.module';
import { ProductService } from 'src/app/admin/services/product.service';
@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar ';
  botonOperacion: string = 'Aceptar ';
  constructor(private fb: FormBuilder, private _productService: ProductService, private router: Router, private toastr: ToastrService, private idRouter: ActivatedRoute) { /*aRouter = idRouter */
    this.form = this.fb.group({
      /*Validaciones */
      title: ['', Validators.required],
      descrip: ['', Validators.required],
      brand_product: ['', Validators.required],
      color: ['', Validators.required],
      quantify: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      url: ['', Validators.required]
    })
    this.id = Number(idRouter.snapshot.paramMap.get('id'))
    console.log(this.id);
  }
  ngOnInit(): void {
    if (this.id != 0) {
      //Es editar
      this.operacion = 'Editar '
      this.botonOperacion = 'Editar '
      this.getProductUpdate(this.id)
    }
  }
  getProductUpdate(id: number) {
    this.loading = true;
    this._productService.getProductUpdate(id).subscribe((data: productsInterface) => {
      console.log(data);
      this.loading = false;
      this.form.patchValue({
        title: data.title,
        descrip: data.descrip,
        brand_product: data.brand_product,
        color: data.color,
        quantify: data.quantify,
        price: data.price,
        stock: data.stock,
        category: data.category,
        size: data.size,
        url: data.url
      })
    })
  }
  addProduct(): void {
    console.log('Add product');
    const product: productsInterface = {
      title: this.form.value.title,
      descrip: this.form.value.descrip,
      brand_product: this.form.value.brand_product,
      color: this.form.value.color,
      quantify: this.form.value.quantify,
      price: this.form.value.price,
      stock: this.form.value.stock,
      category: this.form.value.category,
      size: this.form.value.size,
      url: this.form.value.url,
    }
    this.loading = true;
    if (this.id !== 0) {
      /*Update producto */
      product.id_product = this.id
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.info(`El producto ${product.title} fue actualizado con exito.`, `Producto actualizado`, {
          tapToDismiss: true,
          closeButton: true
        });
        this.router.navigate(['/admin/crudproducts'])
      })
    } else {
      //Es agregar
      this._productService.saveProduct(product).subscribe(() => {
        console.log('Producto agregado');
        this.loading = false;
        this.toastr.success(`El producto ${product.title} fue registrado con exito.`, `Producto registrado`, {
          tapToDismiss: true,
          closeButton: true
        });
        this.router.navigate(['/admin/crudproducts'])
      })
    }
  }
}
