import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasVendasComponent } from './minhas-vendas.component';
import { VendasComponent } from './vendas/vendas.component';

@NgModule({
  declarations: [
    MinhasVendasComponent,
    VendasComponent,
  ],
  imports: [
    CommonModule,
  ]
})
export class MinhasVendasModule { }
