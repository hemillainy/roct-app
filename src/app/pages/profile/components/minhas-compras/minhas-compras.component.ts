import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    page: 1,
    docs: [
      {
        title: 'Rabadon',
        description: 'Item AP',
        status: 'Finalizada',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://cdn-images.win.gg/news/d1359f9934ee5a75ed441ffce412a0a1/db52d5b965e38a07edeac144421e8b4a/original.png'
      },
      {
        title: 'Rylai',
        description: '+300 de Vida; +90 de Poder de Habilidade; Passivo ÚNICO: Feitiços e Habilidades que causam dano reduzem a Velocidade de Movimento do inimigo em 20% por 1s.',
        status: 'Entregue',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pm1.narvii.com/6312/5bae30449776358939d476751c3d7792b5212301_00.jpg'
      },
      {
        title: 'Morellonomicon',
        description: 'descricao',
        status: 'Paga',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQc6_hXMn_Xgl9maOK-ytgLOjiU1z5zYkY7Ww&usqp=CAU'
      },
      {
        title: 'Cutelo Negro',
        description: 'descricao',
        status: 'Finalizada',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EUQ5GEiWoAIaTdE.jpg'
      },
      {
        title: 'Gema',
        description: 'descricao',
        status: 'Finalizada',
        price: 9.98,
        type: "gema",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://s2.glbimg.com/4eaGYh0nGDi0WYUr-QQS685Oegg=/0x0:1280x720/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/I/2/cK4QctRSKlIhkVwlnGBw/gemas-lol.jpg'
      },
      {
        title: 'Orbe do Mundial 2020',
        description: 'descricao',
        status: 'Paga',
        price: 9.98,
        type: "orbe",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EiJBqCeWAAgeaZs.png'
      },
      {
        title: 'Fragmento de Campeão',
        description: 'descricao',
        status: 'Entregue',
        price: 9.98,
        type: "item",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://pbs.twimg.com/media/EiJBqCfXYAAI_gp.png'
      },
      {
        title: 'Ekko True Damage',
        description: 'descricao',
        status: 'Finalizada',
        price: 9.98,
        type: "skin",
        seller: "LoneDarkWolf",
        seller_ratting: 4.9,
        date: "19/10/2020",
        image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ekko_19.jpg'
      },
      {
        title: 'Obisidian Dragon',
        description: 'descricao',
        status: 'Finalizada',
        price: 9.98,
        type: "skin",
        seller: "Dalembert",
        seller_ratting: 4.9,
        date: "11/10/2020",
        image: 'https://cabanadoleitor.com.br/wp-content/uploads/2020/09/sett-560x600.jpg'
      }
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


  //AJEITAR ISSO
  public search(): void {
    this.filter.filtered = this.clearFilter();
  }

}
