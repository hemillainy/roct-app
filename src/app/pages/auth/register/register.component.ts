import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Data
  public data: any;

  constructor() {
    this.data = {
      name: undefined,
      username: undefined,
      cpf: undefined,
      email: undefined,
      pwd: {
        password: undefined,
        confirm_password: undefined
      }
    };
  }

  ngOnInit() {
  }

}
