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
        animate('250ms', style({})),
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

  constructor(
    private session: SessionService,
    private ctrlUser: UserService,
    private router: Router
  ) {
    this.data = {
      name: undefined,
      email: undefined,
      cpf: undefined,
      phone: undefined,
      avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-380-456332.png",
      isSalesman: false,
      pwd: {
        password: undefined,
        confirm_password: undefined
      }
    };
    this.changeAvatar = false;
    this.boxAvatar = false;
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

  public resetPassword(): void {
    this.data.pwd = {
      password: undefined,
      confirm_password: undefined
    }
  }

  private validaSenha(): boolean {
    if (this.data.pwd.password !== this.data.pwd.confirm_password) {
      this.resetPassword();
      return false;
    }
    return true;
  }


  public submit(): void {
    this.resetStatus();
    if (this.validaSenha()) {
      this.status.loading = true;
      let user = Object.assign({}, this.data)
      const pwd = Object.assign({}, this.data.pwd)
      delete user.pwd;
      delete pwd.confirm_password;
      user.password = pwd.password;
      this.ctrlUser.create(user)
        .then(res => {
          this.session.setToken(res.data.token);
          this.session.setUser(res.data.user);
          this.session.isLogged = true;
          this.router.navigate(['/user/profile']);
        }).catch(err => {
          console.log(err.data);
          console.log(err);
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
