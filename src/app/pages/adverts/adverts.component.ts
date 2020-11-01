import { Component, OnInit } from '@angular/core';
import { query } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    ]
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
        this.filter.game = queryParams['game'] || '';
        this.filter.server = queryParams['server'] || '';
        this.filter.type = queryParams['type'] || '';
        this.filter.text = queryParams['search'] || '';
        this.data.page = parseInt(queryParams['page'], 10);
        if (!this.data.page) {
          this.data.page = 1;
        }
      }
    );
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });
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
    console.log(this.filter);
    this.router.navigate([], {
      queryParams: {
        page: this.data.page,
        game: this.filter.game,
        server: this.filter.server,
        type: this.filter.type,
        text: this.filter.text
      }, queryParamsHandling: 'merge'
    });
    this.filter.filtered = this.clearFilter();
  }

}
