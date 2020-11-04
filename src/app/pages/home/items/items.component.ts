import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { translateValue } from "src/utils";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public items: [];

  constructor(
    private router: Router,
    private ctrlItems: ItemsService
  ) {
    this.items = [];
  }

  ngOnInit() {
    this.ctrlItems.getItems({ page: 1, per_page: 4 }).then(res => {
      this.items = res.data.data.map(item => {
        item.type = translateValue(item.type_);
        return item;
      });
    })
  }

  public viewItems(): void {
    this.router.navigate(['/item'], { queryParams: { page: 1 } });
  }

}
