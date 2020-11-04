import axios from 'axios';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private END_POINT: string;

  constructor(
    private session: SessionService
  ) {
    this.END_POINT = environment.END_POINT_API;
  }

  private getConfig(): any {
    const token = this.session.getToken();
    axios.defaults.headers.common['Authorization'] = token;
    return { headers: { Authorization: token } };
  }

  public getItems(paginacao: any): Promise<any> {
    return axios.post(`${this.END_POINT}/announcements`, paginacao);
  }

  public getItem(id: string): Promise<any> {
    return axios.get(`${this.END_POINT}/announcements/${id}`, this.getConfig());
  }

  public create(data: any): Promise<any> {
    return axios.post(`${this.END_POINT}/announcements/add`, data,  this.getConfig());
  }

  public getItemsTypes(): Promise<any> {
    return axios.get(`${this.END_POINT}/announcements/types`,  this.getConfig());
  }

  public getItemsGames(): Promise<any> {
    return axios.get(`${this.END_POINT}/announcements/games`,  this.getConfig());
  }

  public getItemsServers(): Promise<any> {
    return axios.get(`${this.END_POINT}/announcements/servers`,  this.getConfig());
  }
}
