import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333'
});

export function setAccessToken(accessToken) {
  console.log(accessToken);
  api.defaults.headers.authorization = `Bearer ${accessToken}`;
}

export function removeAutorization() {
  api.defaults.headers.authorization = undefined;
}

export default api;