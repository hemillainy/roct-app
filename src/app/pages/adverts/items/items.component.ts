import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  @Input() items: any[];
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToItem(itemId : any): void {
    this.router.navigate([`/item/${itemId}`]);
  }

}
