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
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      },
      {
        title: 'Jayce Academia de Batalha',
        price: 9.98,
        type: 'skin',
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jayce_5.jpg'
      }
    ]
  };

}
