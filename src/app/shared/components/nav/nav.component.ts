import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemsService } from "src/app/controllers/items/items.service";
import { SessionService } from 'src/app/controllers/session/session.service';
import { translateValue } from "src/utils"

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private scroll = 0;
  public search = '';

  public navItems: {
    games: [];
    servers: [];
    itens: [];
  }

  constructor(
    private router: Router,
    private ctrlItems: ItemsService,
    private ctrlSession: SessionService,
  ) {
    this.navItems = {
      games: [],
      servers: [],
      itens: []
    }
  }

  ngOnInit() {
    Promise.all([this.ctrlItems.getItemsGames(), this.ctrlItems.getItemsServers(), this.ctrlItems.getItemsTypes()]).then(([resGames, resServers, resTypes]) => {
      
      this.navItems = {
        games: resGames.data.map(item => {
          return { value: item, label: item }
        }),
        servers: resServers.data.map(item => {
          return { value: item, label: item }
        }),
        itens: resTypes.data.map(item => {
          return { value: item, label: translateValue(item) }
        })
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  public fixed(event: any): boolean {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.scroll = st <= 0 ? 0 : st;
    return st > 180;
  }

  public userLoged(): boolean {
    return this.ctrlSession.isLogged;
  }

  public goHome(): void {
    this.router.navigate(['/']);
  }

  public show(): boolean {
    return !this.router.url.includes('user/login') && !this.router.url.includes('user/new');
  }

  public main(): boolean {
    return this.router.url === '/';
  }

  public openServer(value: string): void {
    this.router.navigate(['/item'], { queryParams: { page: 1, server: value } });
  }

  public openGame(value: string): void {
    this.router.navigate(['/item'], { queryParams: { page: 1, game: value } });
  }

  public openItem(value: string): void {
    this.router.navigate(['/item'], { queryParams: { page: 1, type: value } });
  }

  public openSearch(): void {
    const searchAux = this.search;
    this.search = "";
    this.router.navigate(['/item'], { queryParams: { page: 1, search: searchAux } });
  }

}
