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

  constructor(
    private session: SessionService,
    private userController: UserService,
    private router: Router
  ) {
    this.data = {
      name: undefined,
      nickname: undefined,
      cpf: undefined,
      email: undefined,
      avatar: undefined,
      pwd: {
        password: undefined,
        confirm_password: undefined
      }
    };
    this.changeAvatar = false;
    this.boxAvatar = false;
    this.status = {
      loading: false,
      error: false
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
      error: false
    };
  }

  public submit(): void {
    this.resetStatus();
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
  }
}
