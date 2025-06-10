import axios from "axios";

const cookieManagerApi = axios.create({
  //baseURL: "http://localhost:8080/api",
  //baseURL: "https://gestorcookies-689273847908.europe-southwest1.run.app/api", //Cloud Run
  baseURL: "https://tfgana.nw.r.appspot.com/api", //App Engine
});

//Configurar interceptores.

// Añadimos la cabecera "Authorization" para las peticiones que requiren el JWT Token
cookieManagerApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: localStorage.getItem("token"),
  };
  return config;
});

export default cookieManagerApi;
