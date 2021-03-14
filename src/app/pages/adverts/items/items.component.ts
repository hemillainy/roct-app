import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() items: any[];

  constructor(private router: Router, private ctrlSession: SessionService) { }

  ngOnInit() {
  }

  public goToItem(itemId: any): void {
    this.ctrlSession.setPreviousPage(this.router.url)
    this.router.navigate([`/item/${itemId}`]);
  }

}
