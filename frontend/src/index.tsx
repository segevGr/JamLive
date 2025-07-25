import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "store";
import { PersistGate } from "redux-persist/integration/react";
import { SocketProvider } from "./context/SocketProvider";
import { LoadingSpinner } from "components";
import i18n from "./i18n";

document.documentElement.setAttribute(
  "dir",
  i18n.language === "he" ? "rtl" : "ltr"
);

i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("dir", lng === "he" ? "rtl" : "ltr");
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <PersistGate
          loading={<LoadingSpinner size="lg" text="Loading session..." />}
          persistor={persistor}
        >
          <App />
        </PersistGate>
      </SocketProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
