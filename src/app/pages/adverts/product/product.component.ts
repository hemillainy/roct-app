import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
export class ProductComponent implements OnInit {

  public id: string;
  public data: any;
  public status = { loaded: false, error: false, success: false, show: false, message: '' };

  constructor(
    private ctrlItems: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    });
    this.getItem();
  }

  private getItem(): void {
    this.status.error = false;
    this.status.loaded = false;
    this.ctrlItems.getItem(this.id)
      .then(res => {
        setTimeout(() => {
          this.data = res.data;
          this.status.loaded = true;
          this.setBackground();
        }, 400);
      }).catch(err => {
        this.status.loaded = true;
        this.status.error = true;
      });
  }

  private setBackground(): void {
   const elem = document.getElementById('overlay-item');
   elem.style.backgroundImage = `url(${this.data.image})`;
  }

  public goToCheckout(itemId: any): void {
    if (this.isLogged()) {
      this.router.navigate([`/item/${itemId}/checkout`]);
    } else {
      this.session.setPreviousPage(this.router.url);
      this.router.navigate([`/user/login`]);
    }
  }

  public isLogged(): boolean {
    return this.session.isLogged;
  }

  public enableShop(salesmanId : any): boolean {
    return salesmanId !== parseInt(this.session.getUserId(), 10);
  }

  public enableDeletion(salesmanId : any): boolean {
    return salesmanId === parseInt(this.session.getUserId(), 10);
  }

  public resetStatus() : void {
    this.status = { loaded: false, error: false, success: false, show: false, message: '' };
  }

  private deleteProduct(uuid: any): void {
    this.ctrlItems.delete(uuid)
      .then(res => {
        this.status.success = true;
        this.status.message = 'Anúncio excluído com sucesso!';
        this.status.show = true;
        setTimeout(() => {
          this.resetStatus();
          this.router.navigate([this.session.getPreviousPage()]);
        }, 2000);
      }).catch(err => {
        this.status.error = true;
        this.status.message = 'Erro ao deletar anúncio: ' + err.data.msg;
        this.status.show = true;
        setTimeout(() => {
          this.resetStatus();
        }, 2000);
      });
  }

}
