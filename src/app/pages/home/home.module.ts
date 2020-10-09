import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { PartnersComponent } from './partners/partners.component';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    PartnersComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
