import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/controllers/user/user.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss'],
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
export class AlterarSenhaComponent implements OnInit {

  public data: any;

  public status: any;

  constructor(
    private ctrlUser: UserService,
    private router: Router
    ) { 
    this.data = {
      userId: undefined,
      pwd: {
        old_password: undefined,
        new_password: undefined,
        confirm_password: undefined
      }
    };
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    }; 
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  public resetPassword(): void {
    this.data.pwd.new_password = undefined;
    this.data.pwd.confirm_password = undefined;
  }

  private validaSenha(): boolean {
    if (this.data.pwd.new_password != this.data.pwd.confirm_password) {
      this.resetPassword();
      return false;
    }

    return true;
  }

  public submit(): void {
    if (this.validaSenha()) {
      this.status.loading = true;
      this.ctrlUser.updatePassword({ ...this.data})
        .then(res => {
          this.router.navigate(['/profile']);
        }).catch(err => {
          this.status.loading = false;
          this.status.error = true;
          setTimeout(() => {
            this.status.error = false;
          }, 3500);
        });
    } else {
      this.status.error = true;
      this.status.error_message = "As senhas não são iguais. Tente novamente";
      setTimeout(() => {
        this.status.error = false;
      }, 3500);
    }
  }

  ngOnInit() {
  }

}
