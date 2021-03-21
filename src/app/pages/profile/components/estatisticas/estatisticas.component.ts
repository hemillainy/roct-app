import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/controllers/profile/profile.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.scss']
})
export class EstatisticasComponent implements OnInit {

  public indicadores: any[];

  constructor(
    private ctrlProfile: ProfileService,
  ) {
    this.indicadores = [];
   }

   criarIndicadores = (indicadores) => [
    {
     value: indicadores.total_users,
     label: 'Total de usuários',
     icon: 'account_circle',
     class: 'info'
    },
    {
      value: indicadores.total_salesman,
      label: 'Total de vendedores',
      icon: 'people',
      class: 'secondary'
     },
     {
      value: indicadores.total_purchases,
      label: 'Número de vendas',
      icon: 'shop_two',
      class: 'danger'
     },
     {
      value: this.formatMoney(indicadores.purchases_value),
      label: 'Valor em vendas',
      icon: 'attach_money',
      class: 'success'
     },
     {
      value: indicadores.total_items,
      label: 'Total de itens anunciados',
      icon: 'announcement',
      class: 'dark'
     }
  ];

  ngOnInit() {
    this.ctrlProfile.getIndicadores().then(({ data }) => {
      console.log(data);
      this.indicadores = this.criarIndicadores(data);
    });
  }

  private formatMoney(label: string) : string {
    return 'R$ ' + label;
  }

}
