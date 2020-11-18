import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  @Input() compras: any[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public setCommand(value: string, id: number, type: string): void {
    this.router.navigate([], { queryParams: { command: value, id, type}, queryParamsHandling: 'merge' });
  }

}
