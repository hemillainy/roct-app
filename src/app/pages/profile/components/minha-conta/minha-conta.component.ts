import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controllers/user/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SessionService } from 'src/app/controllers/session/session.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-minha-conta',
  templateUrl: './minha-conta.component.html',
  styleUrls: ['./minha-conta.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({}),
        animate('250ms', style({})),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MinhaContaComponent implements OnInit {

  // Data
  public data: any;
  private data_aux: any;

  // Scenes
  public status: any;
  public isEditando: any;

  constructor(
    private ctrlUser: UserService,
    private router: Router,
    private ctrlSession: SessionService) {

    this.data = {
      id: isUndefined,
      name: undefined,
      email: undefined,
      cpf: undefined,
      phone: undefined,
      avatar: undefined,
      isSalesman: undefined,
    };
    this.data_aux = undefined;
    this.isEditando = false;
    this.status = {
      loading: false,
      error: false,
      error_message: 'Algo de errado aconteceu, tente novamente'
    };
  }

  ngOnInit() {
    if (this.ctrlSession.getUser() !== undefined) {
      this.data = this.ctrlSession.getUser();
    } else {
      console.log('Erro ao recuperar o usuário da sessão');
    }
  }

  public editMode(): void {
    this.isEditando = true;
    this.data_aux = Object.assign({}, this.data);
  }

  public getAccountType(): string {
    return this.data.isSalesman ? 'Vendedor' : 'Comprador';
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      error_message: 'Algo de errado aconteceu, tente novamente'
    };
  }

  public resetChanges(): void {
    this.data = Object.assign({}, this.ctrlSession.getUser());
    this.isEditando = false;
  }

  public validate(): boolean {
    return (this.data.name && this.data.email && this.data.cpf && this.data.phone);
  }

  public submit(): void {
    if(this.validate()) {
      this.resetStatus();
      this.status.loading = true;
      this.ctrlUser.update(this.data)
        .then(res => {
          this.ctrlSession.setUser(res.data);
          setTimeout(() => {
            this.status.loading = false
            this.isEditando = false;
          }, 500);
        }).catch(err => {
          this.status.loading = false;
          this.status.error = true;
          // this.resetChanges(); VOLTAR
          setTimeout(() => {
            this.status.error = false;
          }, 3500);
        });
    } else {
      this.status.error = true;
      this.status.error_message = "Preencha todos os campos obrigatórios"
      setTimeout(() => {
        this.resetStatus();
      }, 2500);
      
    }
  }

}
