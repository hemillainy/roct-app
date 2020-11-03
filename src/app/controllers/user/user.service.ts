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
    const token = this.session.getToken();
    axios.defaults.headers.common['Authorization'] = token;
    return { headers: { Authorization: token } };
  }

  public create(data: any): Promise<any> {
    return axios.post(this.END_POINT + '/users', data, this.getConfig());
  }

  public update(data: any): Promise<any> {
    return axios.put(this.END_POINT + `/users/${data.id}`, this.getConfig(), data);
  }

  public updatePassword(data: any): Promise<any> {
    return axios.put(this.END_POINT + `/users/${data.userId}/${data.id}`, data, this.getConfig());
  }

  public upgradeAccount(data: any): Promise<any> {
    return axios.post(this.END_POINT + `/users/${data.userId}/upgrade`, this.getConfig());
  }
}
