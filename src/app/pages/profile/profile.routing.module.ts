import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { CriarAnuncioComponent } from './components/criar-anuncio/criar-anuncio.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
import { MinhasComprasComponent } from './components/minhas-compras/minhas-compras.component';
import { MinhasVendasComponent } from './components/minhas-vendas/minhas-vendas.component';
import { TransformaContaComponent } from './components/transforma-conta/transforma-conta.component';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{
				path: 'account',
				component: MinhaContaComponent
			},
			{
				path: 'password',
				component: AlterarSenhaComponent
			},
			{
				path: 'change-type',
				component: TransformaContaComponent
			},
			{
				path: 'my-purchases',
				component: MinhasComprasComponent
			},
			{
				path: 'my-sales',
				component: MinhasVendasComponent
			},
			{
				path: 'new-advertise',
				component: CriarAnuncioComponent
			},
			{
				path: '**',
				redirectTo: 'account'
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/