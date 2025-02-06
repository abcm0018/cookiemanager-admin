import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage por defecto
import { authSlice } from "./auth/authSlice";
import persistStore from "redux-persist/es/persistStore";
import { adminSlice } from "./admin/adminSlice";
import { subscriptionSlice } from "./subscriptions/subscriptionSlice";

// Configuración de redux-persist
const persistConfig = {
  key: "root", // Clave base para guardar el estado
  storage, // Usa localStorage (puedes cambiarlo a sessionStorage si prefieres)
  version: 1,
  whitelist: ["auth", "admin", "subscriptions"], // Reducers que deseas persistir
};

// Configuracón de los reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  admin: adminSlice.reducer,
  subscriptions: subscriptionSlice.reducer,
});

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuración de la store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Necesario para evitar errores de serialización con redux-persist
    }),
});

// Configuración de persistor
export const persistor = persistStore(store);
