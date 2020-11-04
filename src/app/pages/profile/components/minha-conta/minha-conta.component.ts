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

  //Data
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
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  ngOnInit() {
    if(this.ctrlSession.user !== undefined) {
      this.data = this.ctrlSession.user;
    } else {
      console.log("Erro ao recuperar o usuário da sessão")
      // this.status.error = true;
      // this.status.error_message = "Erro ao recuperar o usuário da sessão";
      //   setTimeout(() => {
      //     this.status.error = false;
      //     this.resetStatus();
      //   }, 3500);
    }
  }

  public editMode(): void {
    this.isEditando = true;
    this.data_aux = Object.assign({}, this.data);
  }

  public getAccountType(): String {
    return this.data.isSalesman ? 'Vendedor' : 'Comprador';
  }


  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  public resetChanges(): void {
    this.data = Object.assign({}, this.ctrlSession.user);
  }

  public submit(): void {
    this.resetStatus();
    this.status.loading = true;
    this.ctrlUser.update(this.data)
      .then(res => {
        //Falta algo aqui??
        this.router.navigate(['/profile']);
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
        //this.resetChanges(); VOLTAR
        setTimeout(() => {
          this.status.error = false;
        }, 3500);
      });
  }

}
