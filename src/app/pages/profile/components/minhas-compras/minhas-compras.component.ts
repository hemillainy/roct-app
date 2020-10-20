import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.scss']
})
export class MinhasComprasComponent implements OnInit {

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

    //VERIFICAR ESSE ROUTER
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });
  }

  private subs: Subscription;
  public filter = {
    filtered: false,
    status: ''
  };

  public resetFilter(): void {
    this.filter = {
      filtered: false,
      status: ''
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


  //AJEITAR ISSO
  public search(): void {
    this.filter.filtered = this.clearFilter();
  }

  public data = {
    page: 1,
    docs: [
      {
        title: 'Rabadon',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://cdn-images.win.gg/news/d1359f9934ee5a75ed441ffce412a0a1/db52d5b965e38a07edeac144421e8b4a/original.png'
      },
      {
        title: 'Rylai',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pm1.narvii.com/6312/5bae30449776358939d476751c3d7792b5212301_00.jpg'
      },
      {
        title: 'Morellonomicon',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc6_hXMn_Xgl9maOK-ytgLOjiU1z5zYkY7Ww&usqp=CAU'
      },
      {
        title: 'Cutelo Negro',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EUQ5GEiWoAIaTdE.jpg'
      },
      {
        title: 'Gema',
        price: 9.98,
        type: "gema",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://s2.glbimg.com/4eaGYh0nGDi0WYUr-QQS685Oegg=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/I/2/cK4QctRSKlIhkVwlnGBw/gemas-lol.jpg'
      },
      {
        title: 'Orbe do Mundial 2020',
        price: 9.98,
        type: "orbe",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EiJBqCeWAAgeaZs.png'
      },
      {
        title: 'Fragmento de Campeão',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EiJBqCfXYAAI_gp.png'
      },
      {
        title: 'Ekko True Damage',
        price: 9.98,
        type: "skin",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_19.jpg'
      }
    ]
  };

}
