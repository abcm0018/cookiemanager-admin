import axios from "axios";

const cookieManagerApi = axios.create({
  baseURL: "http://localhost:8080/api",
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
