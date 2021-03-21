import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from 'src/environments/environment';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

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

  // public uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();

  //   formData.append('image', image);

  //   return this.http.post('/api/v1/image-upload', formData);
  // }

  getIndicadores() {
    return axios.get(this.END_POINT + '/dashboard/metrics', this.getConfig());
  }

}

