import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  private scroll = 0;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  public fixed(event: any): boolean {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    this.scroll = st <= 0 ? 0 : st;
    return st > 80;
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

}
