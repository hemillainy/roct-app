import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/environments/environment";
import { SessionService } from "../session/session.service";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  private END_POINT: string;

  constructor(private session: SessionService) {
    this.END_POINT = environment.END_POINT_API;
  }

  private getConfig(): any {
    const token = this.session.getToken();
    axios.defaults.headers.common.Authorization = token;
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  public pay(data: any): Promise<any> {
    return axios.post(
      `${this.END_POINT}/purchases/add`,
      data,
      this.getConfig()
    );
  }

  public updateStatusPurchase(data: any): Promise<any> {
    return axios.post(
      `${this.END_POINT}/purchases/update_status`,
      data,
      this.getConfig()
    );
  }

  public getPaymentLink(data: any): Promise<any> {
    return axios.post(
      `${this.END_POINT}/payments/generate_qr_code`,
      data,
      this.getConfig()
    );
  }
}
