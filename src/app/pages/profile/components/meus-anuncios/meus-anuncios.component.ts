import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/controllers/user/user.service';

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.scss']
})
export class MeusAnunciosComponent implements OnInit {

  public data = {
    page: 1,
    anuncios: [],
  }

  private subs: Subscription;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ctrlUser: UserService,
    ) { }

  

  ngOnInit() {
    this.setQueryParams();
  }

  private setQueryParams(): void {
    this.subs = this.route.queryParams.subscribe(
      queryParams => {
        this.data.page = parseInt(queryParams['page'], 10);
        if (!this.data.page) {
          this.data.page = 1;
        }
        
        this.getMyAnnouncements();
      }
    );
    this.router.navigate([], { queryParams: { page: this.data.page }, queryParamsHandling: 'merge' });

  }
  
  private getMyAnnouncements(): void {
    this.ctrlUser.getMyAnnouncements({
      page: this.data.page,
      per_page: 100,
    }).then(res => {
      this.data.anuncios = res.data.data.filter(anuncio => anuncio.available);
    });
  }

}
