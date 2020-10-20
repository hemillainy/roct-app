import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  @Input() compras: any[];

  constructor() { }

  ngOnInit() {
  }

}
