import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {

  @Input() anuncios: any[];
  
  constructor(private router: Router, private ctrlSession: SessionService) { }

  ngOnInit() {
  }

  public goToItem(itemId: any): void {
    this.ctrlSession.setPreviousPage(this.router.url)
    this.router.navigate([`/item/${itemId}`]);
  }

}
