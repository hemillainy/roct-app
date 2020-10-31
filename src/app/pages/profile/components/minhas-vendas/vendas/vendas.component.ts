import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  @Input() vendas: any[];
  
  constructor() { }

  ngOnInit() {
  }

}
