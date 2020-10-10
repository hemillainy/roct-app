import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    AdvertsComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class AdvertsModule { }
