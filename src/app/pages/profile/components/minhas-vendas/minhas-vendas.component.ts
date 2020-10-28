import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
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
    docs: [
      {
        title: 'Morellonomicon',
        description: 'descricao',
        status: 'Paga',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        shopper: "Dalembert",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc6_hXMn_Xgl9maOK-ytgLOjiU1z5zYkY7Ww&usqp=CAU'
      },
      {
        title: 'Orbe do Mundial 2020',
        description: 'descricao',
        status: 'Disponivel',
        price: 15.99,
        type: "orbe",
        seller: "LoneDarkWolf",
        shopper: "Condezero",
        seller_ratting: 4.9,
        date: undefined,
        image: 'https://pbs.twimg.com/media/EiJBqCeWAAgeaZs.png'
      },
      {
        title: 'Ekko True Damage',
        description: 'descricao',
        status: 'Finalizada',
        price: 25.00,
        type: "skin",
        seller: "LoneDarkWolf",
        shopper: "Quelll123",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_19.jpg'
      },
      {
        title: 'Obisidian Dragon',
        description: 'descricao',
        status: 'Entregue',
        price: 30.00,
        type: "skin",
        seller: "LoneDarkWolf",
        shopper: "RinoaSama",
        seller_ratting: 4.9,
        date: "11/10/2020",
        image: 'https://cabanadoleitor.com.br/wp-content/uploads/2020/09/sett-560x600.jpg'
      }
    ]
  };

}
