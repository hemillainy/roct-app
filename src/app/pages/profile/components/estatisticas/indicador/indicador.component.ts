import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss']
})
export class IndicadorComponent implements OnInit {

  @Input() indicador: any;
  
  constructor() { }

  ngOnInit() {
  }

}
