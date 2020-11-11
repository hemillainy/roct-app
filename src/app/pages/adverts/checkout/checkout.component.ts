import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from 'src/app/controllers/items/items.service';
import { SessionService } from 'src/app/controllers/session/session.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public id: string;
  public data: any;
  public status = { loaded: false, error: false };
  public method = { type: '', number: undefined, name: undefined, security_code: undefined, validity: undefined };

  constructor(
    private ctrlItems: ItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private session: SessionService
  ) { }

  ngOnInit() {
    if (this.session.isLogged) {
      this.route.paramMap.subscribe(paramMap => {
        this.id = paramMap.get('id');
      });
      this.getItem();
    } else {
      this.router.navigate(['/item']);
    }
  }

  private getItem(): void {
    this.status.error = false;
    this.status.loaded = false;
    this.ctrlItems.getItem(this.id)
      .then(res => {
        setTimeout(() => {
          this.data = res.data;
          this.status.loaded = true;
        }, 400);
      }).catch(err => {
        this.status.loaded = true;
        this.status.error = true;
      });
  }
}
