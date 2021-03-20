import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { ProfileComponent } from './profile.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { TransformaContaComponent } from './components/transforma-conta/transforma-conta.component';
import { MinhasComprasComponent } from './components/minhas-compras/minhas-compras.component';
import { ComprasComponent } from './components/minhas-compras/compras/compras.component';
import { CriarAnuncioComponent } from './components/criar-anuncio/criar-anuncio.component';
import { MinhasVendasModule } from './components/minhas-vendas/minhas-vendas.module';
import { ConsultaAnuncioComponent } from './components/consulta-anuncio/consulta-anuncio.component';
import { MeusAnunciosComponent } from './components/meus-anuncios/meus-anuncios.component';
import { AnunciosComponent } from './components/meus-anuncios/anuncios/anuncios.component';
import { EstatisticasComponent } from './components/estatisticas/estatisticas.component';
import { IndicadorComponent } from './components/estatisticas/indicador/indicador.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MinhaContaComponent,
    AlterarSenhaComponent,
    TransformaContaComponent,
    MinhasComprasComponent,
    ComprasComponent,
    CriarAnuncioComponent,
    ConsultaAnuncioComponent,
    MeusAnunciosComponent,
    AnunciosComponent,
    EstatisticasComponent,
    IndicadorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    MinhasVendasModule,
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
