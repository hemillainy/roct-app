import axios from "axios";
import { environment } from 'src/environments/environment';

axios.interceptors.response.use((response) => {
  return response;

}, (error) => {
  
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  return axios.get(environment.END_POINT_API + '/auth/refresh_token', { headers: { Authorization: `Bearer ${localStorage.getItem('refreshToken')}`} })
    .then((responseToken) => {
      const token = responseToken.data.token;

      localStorage.setItem('Authorization', token);

      const config = error.config;
      config.headers['Authorization'] = `Bearer ${token}`;

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

    })
    .catch((error) => {
      Promise.reject(error);
    });
});