import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'protractor';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { SessionService } from 'src/app/controllers/session/session.service';
import { UserService } from 'src/app/controllers/user/user.service';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.scss']
})
export class MinhasComprasComponent implements OnInit {

  // Data
  private subs: Subscription;
  public filter = {
    filtered: false,
    status: '',
    server: ''
  };

  public data = {
    page: 0,
    docs: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrlUser: UserService,
    private ctrlSession: SessionService
  ) { }

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
        this.getMyPurchases();
      }
    );
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });

  }

  private getMyPurchases(): void {
    this.ctrlUser.getMyPurshases({
      page: this.data.page,
      per_page: 100,
      id: this.ctrlSession.getUserId()
    }).then(res => {
      this.data.docs = res.data.data;
    });
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

}
