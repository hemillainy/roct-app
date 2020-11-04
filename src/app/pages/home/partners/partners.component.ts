import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/controllers/items/items.service';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {

  public servers: [];

  constructor(private ctrlItems: ItemsService) {
    this.servers = [];
   }

  ngOnInit() {
    this.ctrlItems.getItemsServers().then(res => {
      this.servers = res.data;
    })
  }

}
