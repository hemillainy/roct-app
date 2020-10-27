import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinhasVendasComponent } from './minhas-vendas.component';
import { VendasComponent } from './vendas/vendas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MinhasVendasComponent,
    VendasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MinhasVendasComponent,
    VendasComponent,
  ],
})
export class MinhasVendasModule { }
