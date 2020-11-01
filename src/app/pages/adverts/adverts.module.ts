import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AdvertsComponent,
    ItemsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdvertsModule { }
