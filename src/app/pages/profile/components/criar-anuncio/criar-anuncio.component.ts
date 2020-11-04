import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { ProfileService } from 'src/app/controllers/profile/profile.service';
import { SessionService } from 'src/app/controllers/session/session.service';
import { translateValue } from 'src/utils';

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
  public dataSelect: {
    typeItem: [];
    server: [];
  }
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private ctrlItems: ItemsService,
    private ctrlSession: SessionService,
  ) {
    this.data = {
      ads: {
        server: '',
        game: undefined,
        name: undefined,
        description: undefined,
        price: undefined,
        type_: '',
        image: '',
        salesman_uuid: undefined,
      },
    };

    this.dataSelect = {
      typeItem: [],
      server: []
    }
    this.status = {
      loading: false,
      type: "",
      show: false,
      message: ""
    };
  }

  ngOnInit() {
    this.ctrlItems.getItemsServers().then(res => {
      this.dataSelect.server = res.data.map(item => {
        return { value: item, label: item }
      });
    });
    this.ctrlItems.getItemsTypes().then(res => {
      this.dataSelect.typeItem = res.data.map(item => {
        return { value: item, label: translateValue(item) }
      });
    });
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
    delete add.game;
    delete add.description;
    return add;
  }

  public submit(): void {
    this.status.loading = true;
    this.data.ads.salesman_uuid = this.ctrlSession.getUserId();
    this.ctrlItems.create(this.data.ads)
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
