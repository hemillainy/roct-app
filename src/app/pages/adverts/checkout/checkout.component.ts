import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ItemsService } from 'src/app/controllers/items/items.service'
import { SessionService } from 'src/app/controllers/session/session.service'
import { CheckoutService } from 'src/app/controllers/checkout/checkout.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  public id: string
  public step = 0
  public data: any
  public payed: boolean
  public nickname = undefined
  public status = { loaded: false, error: false }
  public validation = { error: false, success: false, message: undefined }
  public method = {
    type: '',
    number: undefined,
    name: undefined,
    security_code: undefined,
    validity: undefined,
    cpf: undefined,
  }
  public payment = {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ctrlItems: ItemsService,
    private session: SessionService,
    private ctrlCheckout: CheckoutService,
  ) {}

  ngOnInit() {
    if (this.session.isLogged) {
      this.route.paramMap.subscribe((paramMap) => {
        this.id = paramMap.get('id')
      })
      this.getItem()
    } else {
      this.router.navigate(['/item'])
    }
    this.payed = false
  }

  private getItem(): void {
    this.status.error = false
    this.status.loaded = false
    this.ctrlItems
      .getItem(this.id)
      .then((res) => {
        const data = {
          value: res.data.price,
          buyer: this.session.getUserId(),
        }
        this.ctrlCheckout
          .getPaymentLink(data)
          .then((res) => (this.payment = res.data))

        setTimeout(() => {
          this.data = res.data
          this.status.loaded = true
        }, 400)
      })
      .catch((err) => {
        this.status.loaded = true
        this.status.error = true
      })
  }

  private hasMissingFields(): boolean {
    return (
      !this.method.type ||
      !this.method.name ||
      !this.method.security_code ||
      !this.method.validity
    )
  }

  public validatePayment(): void {
    // if (!this.hasMissingFields()) {
    this.changePanel('confirmation')
    // } else {
    //   this.activateAlert(
    //     "error",
    //     "Preencha todos os campos para poder prosseguir!"
    //   );
    //   setTimeout(() => {
    //     this.resetValidation();
    //   }, 3500);
    // }
  }

  private changePanel(panel: String): void {
    if (!this.payed) {
      panel === 'payment'
        ? (this.step = 0)
        : panel === 'confirmation'
        ? (this.step = 1)
        : (this.step = 2)
    }
  }

  public pay(): void {
    // if (!this.hasMissingFields() && this.nickname) {
    // this.ctrlCheckout
    //   .pay(this.mountData())
    //   .then((res) => {
    // const updateStatus = { id: res.data.uuid }
    // this.ctrlCheckout.updateStatusPurchase(updateStatus)
    this.payed = true
    this.step = 2
    this.activateAlert('success', 'Compra efetuada com sucesso!')
    setTimeout(() => {
      this.resetValidation()
    }, 3500)
    // })
    // .catch((err) => {
    //   this.activateAlert('error', err.message)
    //   setTimeout(() => {
    //     this.resetValidation()
    //   }, 3500)
    // })
    // } else {
    //   this.activateAlert(
    //     'error',
    //     'Preencha todos os campos para poder prosseguir!',
    //   )
    //   setTimeout(() => {
    //     this.resetValidation()
    //   }, 3500)
    // }
  }

  private mountData(): any {
    const data = {
      announcement_uuid: this.id,
      type_card: this.method.type,
      number_card: this.method.number,
      cvv: this.method.security_code,
      cpf_owner_card: this.method.cpf,
      validity_card: this.method.validity,
      name_owner_card: this.method.name,
      salesman_uuid: this.data.salesman.id,
      buyer_uuid: this.session.getUserId(),
      nick_game: this.nickname,
    }
    return data
  }

  private activateAlert(mode: String, msg: String): void {
    if (mode === 'error') {
      this.validation.error = true
      this.validation.message = msg
    } else if (mode === 'success') {
      this.validation.success = true
      this.validation.message = msg
    }
  }

  private resetValidation(): void {
    this.validation = { error: false, success: false, message: undefined }
  }

  public goToItems(): void {
    this.router.navigate(['/item'])
  }
}
