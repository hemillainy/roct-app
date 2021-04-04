import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private END_POINT: string;

  constructor(
    private session: SessionService
  ) {
    this.END_POINT = environment.END_POINT_API;
  }

  private getConfig(): any {
    const token = `Bearer ${this.session.getToken()}`;
    axios.defaults.headers.common.Authorization = token;
    return { headers: { Authorization: token } };
  }

  public create(data: any): Promise<any> {
    return axios.post(this.END_POINT + '/users', data);
  }
  
  public getUser(id: string): Promise<any> {
    return axios.get(this.END_POINT + `/users/${id}`, this.getConfig());
  }

  public blockUser(id: string): Promise<any> {
    return axios.put(this.END_POINT + `/dashboard/limit-user/${id}`, this.getConfig());
  }

  public unlockUser(id: string): Promise<any> {
    return axios.put(this.END_POINT + `/dashboard/unlimit-user/${id}`, this.getConfig());
  }

  public getUsers(filters: {
    name?: string;
    cpf?: string;
    email?: string;
    limited?: boolean;
    page: number;
    per_page: number;
  }): Promise<any> {

    const axiosConfig = filters ?
      {...this.getConfig(), params: {...filters}}
      : this.getConfig();

    return axios.get(this.END_POINT + '/users', axiosConfig);
  }

  public update(data: any): Promise<any> {
    return axios.put(this.END_POINT + `/users/${this.session.getUserId()}`, data, this.getConfig());
  }

  public updatePassword(data: any): Promise<any> {
    return axios.put(this.END_POINT + `/users/${this.session.getUserId()}/changePassword`, data, this.getConfig());
  }

  public upgradeAccount(data: any): Promise<any> {
    return axios.put(this.END_POINT + `/users/${this.session.getUserId()}`, data, this.getConfig());
  }

  public getMyPurshases(paginacao: any): Promise<any> {
    return axios.post(`${this.END_POINT}/purchases/purchases`, paginacao, this.getConfig());
  }

  public getMySales(paginacao: any): Promise<any> {
    return axios.post(`${this.END_POINT}/purchases/sales`, paginacao, this.getConfig());
  }

  public getMyAnnouncements(paginacao: any): Promise<any> {
    return axios.post(`${this.END_POINT}/announcements/salesman/${this.session.getUserId()}`, paginacao, this.getConfig());
  }

  public confirmDelivery(id: any): Promise<any> {
    return axios.put(`${this.END_POINT}/purchases/${id}/confirmDelivery`, this.getConfig());
  }
}
