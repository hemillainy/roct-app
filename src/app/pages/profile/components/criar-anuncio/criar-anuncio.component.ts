import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';
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
    private profileService: ProfileService,
    private ctrlItems: ItemsService,
  ) {
    this.data = {
      ads: {
        server: '',
        gameName: undefined,
        name: undefined,
        description: undefined,
        price: undefined,
        type_: '',
        image: 'https://',
        salesman_uuid: undefined,
      },
      //image(url), name(string), description(string), price(float), type_({item, account, gold}), salesman_uuid(int)
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

  //TEMPORARIO
  public extractAdd() {
    let add = Object.assign({}, this.data.add);
    delete add.server;
    delete add.gameName;
    delete add.description;
    return add;
  }

  public submit(): void {
    this.status.loading = true;
    this.ctrlItems.create(this.extractAdd())//Alterar posteriormente
      .then(res => {
        this.router.navigate(['/profile']);
      }).catch(err => {
        this.status.loading = false;
        this.status.type = "error";
        this.status.show = true;
        this.status.message = "Ocorreu um erro na criação."
        this.status.error = true;
        setTimeout(() => {
          this.resetStatus();
        }, 3500);
      });

    //this.status = { ...this.status, type: "success", show: true, message: "Anúncio criado" };
  }

}
