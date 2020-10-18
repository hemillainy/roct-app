import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertsComponent } from './adverts.component';
import { ItemsComponent } from './items/items.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdvertsComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdvertsModule { }
