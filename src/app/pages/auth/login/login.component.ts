import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/controllers/auth/auth.service';
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
    private ctrlAuth: AuthService
  ) {
    this.data = {
      email: undefined,
      password: undefined
    };
    this.status = {
      loading: false,
      error: false
    };
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

  public auth(): void {
    this.resetStatus();
    this.status.loading = true;
    this.ctrlAuth.auth(this.data)
      .then(res => {
        this.session.logIn(res.data.token);
        this.session.setUserId(res.data.user.id);
        this.router.navigate([this.session.getPreviousPage()]);
      }).catch(err => {
        this.status.loading = false;
        this.status.error = true;
        setTimeout(() => {
          this.status.error = false;
        }, 3500);
      });
  }
}
