import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private subs: Subscription;
  public renderizaTornarVendedor = undefined;
  public component = {
    pages: ['account', 'password', 'change-type', 'purchases', 'advertise', 'sales', "status-announcement"],
    command: 'account'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrlSession: SessionService,
  ) { }

  ngOnInit() {
    if (this.isLogged()) {
      this.subs = this.route.queryParams.subscribe(
        queryParams => {
          const command = queryParams.command || 'info';
          this.component.command = command;
          if (!this.component.pages.includes(command)) {
            this.component.command = 'account';
          }
        }
      );
      this.router.navigate([], { queryParams: { command: this.component.command }, queryParamsHandling: 'merge' });
      this.renderizaTornarVendedor = this.ctrlSession.getUser() !== undefined && !this.ctrlSession.getUser().isSalesman;
    } else {
      this.router.navigate(['/']);
    }
  }

  public setCommand(value: string): void {
    this.component.command = value;
    this.router.navigate([], { queryParams: { command: this.component.command }, queryParamsHandling: 'merge' });
  }

  public logOut(): void {
    this.ctrlSession.logOut();
    this.router.navigate(['/']);
  }

  public isLogged(): boolean {
    return this.ctrlSession.isLogged;
  }

}
