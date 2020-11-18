import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { SessionService } from 'src/app/controllers/session/session.service';
import { UserService } from 'src/app/controllers/user/user.service';
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
    private ctrlUser: UserService,
    private ctrlSession: SessionService,
  ) {
    this.items = [];
  }

  ngOnInit() {
    this.setQueryParams();
  }

  private setQueryParams(): void {
    this.subs = this.route.queryParams.subscribe(
      queryParams => {
        this.filter.status = queryParams['status'] || '';
        this.data.page = parseInt(queryParams['page'], 10);
        if (!this.data.page) {
          this.data.page = 1;
        }
        this.getMySales();
      }
    );
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

  private getMySales(): void {
    this.ctrlUser.getMySales({
      page: this.data.page,
      per_page: 100,
      id: this.ctrlSession.getUserId()
    }).then(res => {
      this.data.docs = res.data.data;
      if (this.filter.status) {
        const mapped_status = this._mapeiaStatus(this.filter.status);
        this.data.docs = this.data.docs.filter(compra => compra.status === mapped_status);
      }
    });
  }

  public search(): void {
    this.filter.filtered = this.clearFilter();
  }


  private _mapeiaStatus(status: string) {
    let mapped = '';
    switch (status) {
      case 'initiated':
        mapped = 'Iniciada';
        break;
      case 'paid':
        mapped = 'Item pago, aguardando entrega';
        break;
      case 'delivered':
        mapped = 'Item entregue, aguardando confirmação';
        break;
      case 'finished':
        mapped = 'Finalizada';
        break;
      default:
        mapped = status;
        break;
    }
    return mapped;
  }

  public data = {
    page: 1,
    docs: []
  }

}
