import axios from "axios";
import { environment } from "src/environments/environment";

//Rotas que retornam 401 e não precisam disparar o refresh token
const blacklist = ["changePassword", "login"];

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const config = error.config;
    const currentPath = new URL(config.url).pathname.split("/");

    const notAllowRefrestToken = currentPath.reduce(
      (accumalator, currentValue) =>
        accumalator || blacklist.includes(currentValue),
      false
    );

    if (
      error.response.status !== 401 ||
      config.__isRetryRequest ||
      notAllowRefrestToken
    ) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    return axios
      .get(environment.END_POINT_API + "/auth/refresh_token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      })
      .then((responseToken) => {
        const token = responseToken.data.token;

        config.__isRetryRequest = true;

        localStorage.setItem("Authorization", token);

        config.headers["Authorization"] = `Bearer ${token}`;

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        });
      })
      .catch((error) => {
        Promise.reject(error);
      });
  }
);
