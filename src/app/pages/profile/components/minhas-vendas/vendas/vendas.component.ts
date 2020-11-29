import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss']
})
export class VendasComponent implements OnInit {

  @Input() vendas: any[];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public setCommand(value: string, id: number, type: string): void {
    this.router.navigate([], { queryParams: { command: value, id, type }, queryParamsHandling: 'merge' });
  }

}
