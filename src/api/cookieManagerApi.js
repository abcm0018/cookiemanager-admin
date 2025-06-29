import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Crear una instancia de Axios
const cookieManagerApi = axios.create({
  //baseURL: "http://localhost:8080/api",
  //baseURL: "https://gestorcookies-689273847908.europe-southwest1.run.app/api", //Cloud Run
  baseURL: "https://tfgana.nw.r.appspot.com/api",
});

// Bandera para evitar múltiples intentos de refresh simultáneos
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Añadir token a las peticiones salientes
cookieManagerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Interceptor de respuestas para manejar errores 401
cookieManagerApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Verifica si es un 401 y no es ya una reintento del refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log(
        "[Interceptor] Error 401 detectado, intentando refrescar token"
      );
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        // No hay refresh token, redirigir o cerrar sesión
        console.log("Interceptor:: no existe el refreshToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      if (isRefreshing) {
        console.log("Interceptor:: refrescando el token");
        // Esperar a que termine el refresh en progreso
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = token;
            return axios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        console.log("Interceptor:: token refrescado");
        const response = await axios.get(
          "https://tfgana.nw.r.appspot.com/api/auth/refreshToken",
          {
            headers: {
              Authorization: refreshToken,
            },
          }
        );

        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;
        console.log("==============================");
        console.log(
          "🔄 Interceptor:: REFRESH TOKEN recibido del backend:",
          newRefreshToken
        );
        console.log("==============================");
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }
        localStorage.setItem("token", "Bearer " + newToken);
        cookieManagerApi.defaults.headers.Authorization = "Bearer " + newToken;
        processQueue(null, newToken);

        return cookieManagerApi(originalRequest);
      } catch (err) {
        console.log("Interceptor:: error al refrescar el token");
        processQueue(err, null);
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Refresco automático del token antes de que expire
let refreshTimeout;

function scheduleTokenRefresh() {
  console.log("[TokenRefresh] scheduleTokenRefresh() llamado");
  if (refreshTimeout) {
    console.log(
      `[TokenRefresh] Cancelando timer anterior con ID: ${refreshTimeout}`
    );
  }
  clearTimeout(refreshTimeout);
  const token = localStorage.getItem("token");
  if (!token) {
    console.log(
      "[TokenRefresh] No hay token en localStorage, no se programa refresco"
    );
    return;
  }
  try {
    // Elimina el prefijo 'Bearer ' si existe
    const jwt = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwtDecode(jwt);
    const exp = decoded.exp * 1000; // ms
    const now = Date.now();
    // Refrescar 30 segundos antes de que expire
    const refreshIn = exp - now - 30000;
    console.log(
      `[TokenRefresh] Token expira en: ${(exp - now) / 1000}s, refresco en: ${
        refreshIn / 1000
      }s`
    );
    console.log(
      `[TokenRefresh] Tiempo actual: ${new Date(
        now
      ).toISOString()}, expiración: ${new Date(exp).toISOString()}`
    );
    if (refreshIn > 0) {
      console.log(
        `[TokenRefresh] Programando timer para refrescar en ${
          refreshIn / 1000
        } segundos`
      );
      refreshTimeout = setTimeout(() => {
        console.log(
          "[TokenRefresh] ⚡ TIMER EJECUTADO - Ejecutando refreshAuthToken() por timer"
        );
        refreshAuthToken();
      }, refreshIn);
      console.log(`[TokenRefresh] Timer programado con ID: ${refreshTimeout}`);
    } else {
      console.log(
        "[TokenRefresh] El token ya está expirado o a punto de expirar, refrescando ahora"
      );
      refreshAuthToken();
    }
  } catch (e) {
    console.log("[TokenRefresh] Error decodificando el token:", e);
    clearTimeout(refreshTimeout);
  }
}

async function refreshAuthToken() {
  console.log("[TokenRefresh] refreshAuthToken() llamado");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.log("[TokenRefresh] No hay refreshToken, no se puede refrescar");
    return;
  }
  try {
    console.log("[TokenRefresh] Solicitando nuevo token usando refreshToken");
    const response = await axios.get(
      "https://tfgana.nw.r.appspot.com/api/auth/refreshToken",
      {
        headers: {
          Authorization: refreshToken,
        },
      }
    );
    const newToken = response.data.token;
    console.log("==============================");
    console.log("🔄 Interceptor:: accessToken recibido del backend:", newToken);
    console.log("==============================");
    const newRefreshToken = response.data.refreshToken;
    console.log("==============================");
    console.log(
      "🔄 Interceptor:: REFRESH TOKEN recibido del backend:",
      newRefreshToken
    );
    console.log("==============================");
    if (newRefreshToken) {
      localStorage.setItem("refreshToken", newRefreshToken);
    }
    console.log(
      "[TokenRefresh] Nuevo token recibido y guardado en localStorage"
    );
    localStorage.setItem("token", "Bearer " + newToken);
    cookieManagerApi.defaults.headers.Authorization = "Bearer " + newToken;
    console.log(
      "[TokenRefresh] Programando nuevo refresco después de obtener token"
    );
    scheduleTokenRefresh();
  } catch (e) {
    console.log("[TokenRefresh] Error al refrescar el token:", e);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
}

// Llama al programador de refresco cada vez que se establece un nuevo token
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key) {
  originalSetItem.apply(this, arguments);
  if (key === "token") {
    console.log(
      "[TokenRefresh] setItem('token') detectado, programando refresco"
    );
    scheduleTokenRefresh();
  }
};

// Al cargar la app, programa el refresco si ya hay token
console.log(
  "[TokenRefresh] Inicializando programación de refresco de token al cargar la app"
);
scheduleTokenRefresh();

export default cookieManagerApi;
