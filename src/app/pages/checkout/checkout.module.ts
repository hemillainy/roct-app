import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  declarations: [
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CheckoutModule { }
