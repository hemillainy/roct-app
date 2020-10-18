import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

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
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
