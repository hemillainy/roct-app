import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/controllers/user/user.service';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-consulta-anuncio',
  templateUrl: './consulta-anuncio.component.html',
  styleUrls: ['./consulta-anuncio.component.scss']
})
export class ConsultaAnuncioComponent implements OnInit {

  public page: number;
  public type: string;
  public id: number;
  public data: any = {};
  public status = { message: "", error: false, show: false };

  constructor(
    private route: ActivatedRoute,
    private ctrlUser: UserService,
    private ctrlSession: SessionService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params.id);
      this.type = params.type;
      this.page = parseInt(params.page);
    });
    this.getItem();
  }

  private getItem(): void {
    this.status.error = false;
    const body = {
      page: this.page,
      per_page: 100,
      id: this.ctrlSession.getUserId()
    }

    if (this.type === "sales") {
      this.ctrlUser.getMySales(body).then(res => {
        this.data = res.data.data.filter(item => this.id === item.uuid)[0];
        console.log(this.data);
      })

    }
    else {
      this.ctrlUser.getMyPurshases(body).then(res => {
        this.data = res.data.data.filter(item => this.id === item.uuid)[0];
        console.log(this.data);
      })
    }
  }

  public confirmDelivery(): void {
    this.ctrlUser.confirmDelivery(this.data.uuid).then(() => {
      this.status = { error: false, message: this.type === "sales" ? "Entrega confirmada" : "Recebimento confirmado", show: true };
      this.getItem();
    }).catch(() => {
      this.status = { error: true, message: "Houve um problema, tente mais tarde.", show: true };
    });
  }


}
