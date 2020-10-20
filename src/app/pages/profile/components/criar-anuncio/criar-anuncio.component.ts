import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/controllers/profile/profile.service';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.scss'],
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
export class CriarAnuncioComponent implements OnInit {

  // Data
  public data: any;
  public status: any;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {
    this.data = {
      ads: {
        server: '',
        gameName: undefined,
        itemName: undefined,
        description: undefined,
        itemPrice: undefined,
        itemType: '',
        image: 'https://'
      },
      auth_token: undefined,
    };
    this.status = {
      loading: false,
      type: "",
      show: false,
      message: ""
    };
  }

  ngOnInit() {
  }

  public resetStatus(): void {
    this.status = {
      loading: false,
      show: false,
      type: "",
      message: ""
    };
  }

  public showAlert(type: string, show: boolean, message: string): void {
    this.status = {
      loading: false,
      show,
      type,
      message
    };
    setTimeout(() => {
      this.resetStatus();
    }, 3500);
  }


  public submit(): void {
    this.status = { ...this.status, type: "success", show: true, message: "Anúncio criado" };
  }

}
