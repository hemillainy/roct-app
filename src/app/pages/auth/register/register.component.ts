import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controllers/session/session.service';
import { UserService } from 'src/app/controllers/user/user.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({}),
        animate('250ms', style({ })),
      ]),
      transition(':leave', [
        animate('250ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  // Data
  public data: any;
  public status: any;

  // Scenes
  public changeAvatar: boolean;
  public boxAvatar: boolean;
  public vendedor: boolean;

  constructor(
    private session: SessionService,
    private userController: UserService,
    private router: Router
  ) {
    this.data = {
      name: undefined,
      email: undefined,
      cpf: undefined,
      telefone: undefined,
      avatar: undefined,
      pwd: {
        password: undefined,
        confirm_password: undefined
      }
    };
    this.changeAvatar = false;
    this.boxAvatar = false;
    this.vendedor = false;
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    }
  }

  ngOnInit() {
  }

  public openAvatarBox(): void {
    this.boxAvatar = true;
  }

  public closeAvatarBox(): void {
    this.boxAvatar = false;
  }

  public setAvatar(event): void {
    this.data.avatar = event.target.src;
    this.closeAvatarBox();
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false,
      error_message: "Algo de errado aconteceu, tente novamente"
    };
  }

  public resetCamposVendedor(): void {
    this.data.cpf = undefined;
    this.data.telefone = undefined;
  }

  public resetPassword(): void {
    this.data.pwd = {
      password: undefined,
      confirm_password: undefined
    }
  }

  private validaSenha(): boolean {
    if(this.data.pwd.password != this.data.pwd.confirm_password) {
      this.resetPassword();
      return false;
    }

    return true;
  }
  

  public submit(): void {
    this.resetStatus();
    if(this.validaSenha()) {
      this.status.loading = true;
      this.userController.create({ ...this.data, password: this.data.pwd.password })
        .then(res => {
          this.session.logIn(res.data.auth_token);
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
}
