import { Component, OnInit } from '@angular/core';
import { SessionService } from './controllers/session/session.service';
import { UserService } from './controllers/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'roct-app';

  constructor(
    private session: SessionService,
    private ctrlUser: UserService
  ) { }

  ngOnInit(): void {
    const auth = this.session.getToken();
    const refreshToken = this.session.getRefreshToken();
    if (auth && auth !== 'undefined') {
      this.session.logIn(auth, refreshToken);
    } else {
      this.session.logOut();
    }
  }
  
}
