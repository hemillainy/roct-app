import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/controllers/session/session.service';
import { UserService } from 'src/app/controllers/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // Data
  public data: any;
  public status: any;

  constructor(
    private router: Router,
    private session: SessionService,
    private userController: UserService
  ) {
    this.data = {
      email: undefined,
      pwd: {
        password: undefined
      }
    };
    this.status = {
      loading: false,
      error: false
    }
  }

  ngOnInit() {
  }

  public goToRegister(): void {
    this.router.navigate(['/user/new']);
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      error: false
    };
  }

  // ATUALIZAR
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
