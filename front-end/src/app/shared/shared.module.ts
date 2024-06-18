import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from '../customer/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { EmailComponent } from '../customer/email/email.component';
import { MatDialogModule } from '@angular/material/dialog'; /* Ventana dialogo email */

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule /* Ventana dialogo email */
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    EmailComponent
  ]
})
export class SharedModule { }
