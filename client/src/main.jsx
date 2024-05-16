import * as React from "react";
import * as ReactDom from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import { ContextProvider } from "./context/ContextProvider";
import Background from "./components/Background";

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ContextProvider>
          <AuthProvider>
            <Background>
              <App />
            </Background>
          </AuthProvider>
        </ContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
