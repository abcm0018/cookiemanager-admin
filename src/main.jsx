import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { CookieManagerAdmin } from "./CookieManagerAdmin.jsx";
import { persistor, store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/**Habilitamos react-redux */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/**Habilitamos react-router */}
        <BrowserRouter>
          <CookieManagerAdmin />
        </BrowserRouter>{" "}
      </PersistGate>
    </Provider>
  </StrictMode>
);
