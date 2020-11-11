import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/controllers/session/session.service';

import { UserService } from 'src/app/controllers/user/user.service';

@Component({
  selector: 'app-transforma-conta',
  templateUrl: './transforma-conta.component.html',
  styleUrls: ['./transforma-conta.component.scss'],
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
export class TransformaContaComponent implements OnInit {

  public aceitouTermos: any;

  public status: any;

  constructor(
    private ctrlSession: SessionService,
    private ctrlUser: UserService,
    private router: Router
  ) {
    this.aceitouTermos = false;
    this.status = {
      loading: false,
      error: false,
      success: false,
      error_message: 'Algo de errado aconteceu, tente novamente',
      success_message: 'Upgrade realizado com sucesso!'
    };
  }

  ngOnInit() {
  }

  public getVantagens(): string {
    return 'Tenha vendas seguras. Nosso sistema garante que o comprador pagou antes do item ser enviado.';
  }

  public getTermosUso(): string {
    return '1- vendedor deve se comprometer a efetivar a operação de entrega sob pena de cancelamento da conta. 2- Será cobrada uma taxa de 5% sobre o preço da venda';
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      success: false,
      error_message: 'Algo de errado aconteceu, tente novamente',
      success_message: 'Upgrade realizado com sucesso!'
    };
  }

  public submit(): void {
    this.resetStatus();
    this.status.loading = true;
    const userUpgrade = Object.assign({}, this.ctrlSession.user);
    userUpgrade.isSalesman = true;
    this.ctrlUser.upgradeAccount(userUpgrade)
      .then(res => {
        this.status.loading = false;
        this.status.success = true;
        this.ctrlSession.setUser(res.data);
        setTimeout(() => {
          this.status.sucess = false;
          // atualiar session
        }, 3500);
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
        setTimeout(() => {
          this.status.error = false;
        }, 3500);
      });
  }

}
