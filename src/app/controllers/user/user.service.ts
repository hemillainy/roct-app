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
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  public create(data: any): Promise<any> {
    return axios.post(this.END_POINT + '/users', data);
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
}
