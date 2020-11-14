import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
  declarations: [
    AdvertsComponent,
    ItemsComponent,
    ProductComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AdvertsModule { }
