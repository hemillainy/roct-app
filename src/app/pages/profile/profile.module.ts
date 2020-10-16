import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { MinhaContaComponent } from './components/minha-conta/minha-conta.component';

@NgModule({
  declarations: [
    ProfileComponent,
    MinhaContaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
