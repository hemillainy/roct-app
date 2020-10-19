import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/controllers/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public compras: any;

  // Scenes Menu
  public sectionOption = 'account';

  constructor(
    private profileService: ProfileService
  ) {
    this.user = {
      username: undefined,
      email: undefined,
      pwd: {
        password: undefined
      }
    };
  }

  ngOnInit() {
    this.compras = this.profileService.getCompras();
  }

}
