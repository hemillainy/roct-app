import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { SessionService } from 'src/app/controllers/session/session.service';
import { translateValue } from "src/utils";

@Component({
  selector: 'app-minhas-vendas',
  templateUrl: './minhas-vendas.component.html',
  styleUrls: ['./minhas-vendas.component.scss']
})
export class MinhasVendasComponent implements OnInit {

  private subs: Subscription;
  public filter = {
    filtered: false,
    status: '',
    server: ''
  };

  public items: [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrlsItems: ItemsService,
    private ctrlSession: SessionService,
  ) { 
    this.items = [];
  }

  ngOnInit() {
    //this.setQueryParams();
    this.ctrlsItems.getItemsSalesman({ page: 1, per_page: 4 },this.ctrlSession.getUserId()).then(res => {
      this.items = res.data.data.map(item => {
        item.type = translateValue(item.type_);
        return item;
      });
    })
  }

  private setQueryParams(): void {
    this.subs = this.route.queryParams.subscribe(
      queryParams => {
        this.filter.status = queryParams['status'] || '';
        this.data.page = parseInt(queryParams['page'], 10);
        if (!this.data.page) {
          this.data.page = 1;
        }
      }
    );
    //CORRIGIR
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });
  }

  public resetFilter(): void {
    this.filter = {
      filtered: false,
      status: '',
      server: ''
    };
    this.search();
  }

  public clearFilter(): boolean {
    let result = false;
    Object.keys(this.filter).slice(1).map(item => {
      result = result || (this.filter[item] !== '')
    });
    return result;
  }

  public search(): void {
    this.filter.filtered = this.clearFilter();
  }

  public data = {
    page: 1,
    docs: []
  }

}
