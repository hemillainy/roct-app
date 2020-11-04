import { Component, OnInit } from '@angular/core';
import { query } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from 'src/app/controllers/items/items.service';

import { translateValue } from "src/utils";

@Component({
  selector: 'app-adverts',
  templateUrl: './adverts.component.html',
  styleUrls: ['./adverts.component.scss']
})
export class AdvertsComponent implements OnInit {

  private subs: Subscription;
  public filter = {
    filtered: false,
    server: '',
    game: '',
    type: '',
    sort: '',
    text: ''
  };

  public filtersData = {
    server: [],
    game: [],
    type: [],
  }

  public data = {
    page: 0,
    docs: []
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ctrlItems: ItemsService,
  ) { }

  ngOnInit() {
    this.setQueryParams();
    this.getItems();
    this.setFiltersData();
  }

  private setQueryParams(): void {
    this.subs = this.route.queryParams.subscribe(
      queryParams => {
        this.filter.game = queryParams['game'] || 'all';
        this.filter.server = queryParams['server'] || 'all';
        this.filter.type = queryParams['type'] || 'all';
        this.filter.text = queryParams['search'] || '';
        this.filter.sort = queryParams['sort'] || '';
        this.data.page = parseInt(queryParams['page'], 10);
        if (!this.data.page) {
          this.data.page = 1;
        }
      }
    );
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });
  }

  public getItems(): void {
    this.ctrlItems.getItems({
      page: this.data.page,
      per_page: 100
    }).then(res => {
      const response = res.data;
      if (response) {
        const { data, info } = response;
        const dataFiltered = this.filterItems(data).map((item: any) => {
          item.type = translateValue(item.type_);
          return item;
        });
        this.data.docs = this.filter.sort === "" ? dataFiltered : dataFiltered.sort((itemA: any, itemB: any) => {
          if (this.filter.sort === "decrescente") {
            return itemB.price - itemA.price;
          }
          else if (this.filter.sort === "crescente") {
            return itemA.price - itemB.price;
          }
        });
      }
    });
  }

  public filterItems(data): [] {
    return data.filter((item, i) => {
      if (this.filter.game === "all" &&
        this.filter.server === "all" &&
        this.filter.type === "all" &&
        this.filter.text === "") {
        return true;
      }
      if (this.filter.game !== "all" && this.filter.game.toLowerCase() !== item.game.toLowerCase()) {
        return false;
      }
      if (this.filter.server !== "all" && this.filter.server.toLowerCase() !== item.server.toLowerCase()) {
        return false;
      }
      if (this.filter.type !== "all" && this.filter.type.toLowerCase() !== item.type_.toLowerCase()) {
        return false;
      }
      if (this.filter.text.trim() !== "" && !item.name.toLowerCase().includes(this.filter.text.toLowerCase())) {
        return false;
      }

      return true;
    });
  }

  public setFiltersData(): void {

    Promise.all([this.ctrlItems.getItemsGames(), this.ctrlItems.getItemsServers(), this.ctrlItems.getItemsTypes()]).then(([games, servers, types]) => {
      this.filtersData.game = games.data.map(item => {
        return { value: item, label: item }
      });

      this.filtersData.server = servers.data.map(item => {
        return { value: item, label: item }
      });

      this.filtersData.type = types.data.map(item => {
        return { value: item, label: translateValue(item) }
      });
    })

  }

  public resetFilter(): void {
    this.filter = {
      filtered: false,
      server: '',
      game: '',
      type: '',
      sort: '',
      text: this.filter.text
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
    this.getItems();

    this.router.navigate([], {
      queryParams: {
        page: this.data.page,
        game: this.filter.game,
        server: this.filter.server,
        type: this.filter.type,
        search: this.filter.text,
        sort: this.filter.sort
      }, queryParamsHandling: 'merge'
    });
    this.filter.filtered = this.clearFilter();
  }

}
