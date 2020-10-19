import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarSenhaComponent } from './components/alterar-senha/alterar-senha.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';
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