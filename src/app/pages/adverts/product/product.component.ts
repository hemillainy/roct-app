import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public id: string;
  public data: any;
  public status = { loaded: false, error: false };

  constructor(
    private ctrlItems: ItemsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id');
    })
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
    let elem = document.getElementById('overlay-item');
    elem.style.backgroundImage = `url(${this.data.image})`;
  }

}
