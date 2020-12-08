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
  public errors: any;

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

    this.initiateErrors();
  }

  ngOnInit() {
    const userId = this.ctrlSession.getUserId();
    if (userId !== undefined) {
      this.ctrlUser.getUser(userId).then(res => {
        this.data = res.data
      });
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
    this.ctrlUser.getUser(this.ctrlSession.getUserId()).then((res) => {
      this.data =  res.data;
    });
    this.isEditando = false;
    this.initiateErrors();
  }

  public submit(): void {
    this.validateAll();
    if (this.isValid()) {
      this.resetStatus();
      this.status.loading = true;
      this.ctrlUser.update(this.data)
        .then(res => {
          this.ctrlSession.setUserId(res.data.id);
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
      this.status.error_message = "Campos obrigatórios não preenchidos."
      setTimeout(() => {
        this.resetStatus();
      }, 2500);

    }
  }

  private initiateErrors(): void {
    this.errors = {};
    this.errors['name'] = false;
    this.errors['email'] = false;
    this.errors['cpf'] = false;
    this.errors['phone'] = false;
  }

  isValid(): boolean {
    for (const e in this.errors) {
      if (this.errors[e]) {
        return false;
      }
    }
    return true;
  }

  private validateAll(): void {
    for (const e in this.errors) {
      this.validate(e)
    }
  }

  validate(property: string): void {
    if (!this.data[property]) {
      this.errors[property] = true;
    } else {
      this.errors[property] = false;
    }
  }

}
