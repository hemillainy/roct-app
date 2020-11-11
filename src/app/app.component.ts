import { Component, OnInit } from '@angular/core';
import { SessionService } from './controllers/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'roct-app';

  constructor(
    private session: SessionService
  ) { }

  ngOnInit(): void {
    const auth = localStorage.getItem('Authorization');
    if (auth && auth !== 'undefined') {
      this.session.setToken(auth);
    } else {
      this.session.logOut();
    }
  }
}
