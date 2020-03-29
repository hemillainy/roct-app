import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Data
  public data: any;

  // Scenes
  public changeAvatar: boolean;
  public boxAvatar: boolean;


  constructor() {
    this.data = {
      name: undefined,
      username: undefined,
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

  public submit(): void {
  }

}
