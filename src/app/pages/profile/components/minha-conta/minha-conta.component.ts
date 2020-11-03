import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controllers/user/user.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SessionService } from 'src/app/controllers/session/session.service';

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

  //Data
  public data: any;
  private data_aux: any;

  // Scenes
  public status: any;
  public isEditando: any;

  constructor(
    private ctrlUser: UserService,
    private router: Router) {
    // this.data = {
    //   name: undefined,
    //   email: undefined,
    //   cpf: undefined,
    //   telefone: undefined,
    //   avatar: undefined,
    //   vendedor: false,
    //   auth_token: undefined,
    // };
    this.data = {
      id: 1,
      name: 'Gabriel Almeida',
      email: 'gabriel.almeida.azevedo@ccc.ufcg.edu.br',
      cpf: '12345678910',
      telefone: '83988888888',
      avatar: "/assets/images/avatar/batman.svg",
      isSalesman: false,
      auth_token: undefined,
    };
    this.data_aux = undefined;
    this.isEditando = false;
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  ngOnInit() {
  }

  public editMode(): void {
    this.isEditando = true;
    this.data_aux = Object.assign({}, this.data);;
  }

  public getAccountType(): String {
    return this.data.isSalesman ? 'Vendedor' : 'Comprador';
  }

  public resetChanges(): void {
    this.data = this.data_aux;
    this.isEditando = false;
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  public submit(): void {
    this.resetStatus();
    this.status.loading = true;
    this.ctrlUser.update({ ...this.data })
      .then(res => {
        //Falta algo aqui??
        this.router.navigate(['/profile']);
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
        setTimeout(() => {
          this.status.error = false;
        }, 3500);
      });
  }

}
