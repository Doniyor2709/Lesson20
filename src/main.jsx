import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "./context/isAuthContext.jsx";
import StoreProvider from "./redux/store/index.jsx";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <StoreProvider>
        <ConfigProvider theme={{
          token:{
            colorPrimary:"orange"
          }
        }}>

        <App />
        </ConfigProvider>
      </StoreProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
