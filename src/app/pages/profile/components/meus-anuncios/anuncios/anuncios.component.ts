import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  @Input() anuncios: any[];
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToItem(itemId: any): void {
    this.router.navigate([`/item/${itemId}`]);
  }

}
