import axios from 'axios';
// @ts-ignore
// import { createAuth0IdP } from '@portal/authn';
// const auth = new createAuth0IdP();

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000/v1';
const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use(async function (config: any) {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${JSON.parse(token)}`;
  }
  //   const { __raw: token } = await auth.getIdTokenClaims();
  //   const data = await auth.getTokenSilently();
  //   config.headers["Authorization"] = `Bearer ${token}`;
  //   config.headers["access_token"] = `Bearer ${data}`;
  return config;
});
export const api = instance;
