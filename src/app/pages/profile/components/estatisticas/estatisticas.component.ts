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
     label: 'Total de usuários'
    },
    {
      value: indicadores.total_salesman,
      label: 'Total de vendedores'
     },
     {
      value: indicadores.total_purchases,
      label: 'Número de vendas'
     },
     {
      value: indicadores.purchases_value,
      isCurrency: true,
      label: 'Valor em vendas'
     },
     {
      value: indicadores.total_items,
      label: 'Total de itens anunciados'
     }
  ];

  ngOnInit() {
    this.ctrlProfile.getIndicadores().then(({ data }) => {
      console.log(data);
      this.indicadores = this.criarIndicadores(data);
    });
  }

}
