import { animate, style, transition, trigger } from '@angular/animations';

import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProfileService } from 'src/app/controllers/profile/profile.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

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

  public data: any;
  public status: any;

  constructor(
    private router: Router,
    private profileService: ProfileService
  ) {
    this.data = {
      ads: {
        server: undefined,
        gameName: undefined,
        itemName: undefined,
        description: undefined,
        itemPrice: undefined,
        selectedFile: ImageSnippet,
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
    }, 3500)
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      const itemImage = new ImageSnippet(event.target.result, file);

      if (itemImage.file) {
        this.data.ads.selectedFile = itemImage;
        console.log(itemImage);

        this.showAlert("success", true, "Imagem carregada");
      }
      else {
        this.showAlert("error", true, "Algo de errado aconteceu, tente novamente");
      }
    });

    reader.readAsDataURL(file);
  }

  submit() {
    this.status = { ...this.status, type: "success", show: true, message: "Anúncio criado" };
  }

  ngOnInit() {
  }

}
