import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from './redux/store.js';
import { BrowserRouter } from "react-router-dom";
import App from "./components/App/App.jsx";
import { Toaster } from 'react-hot-toast';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { borderRadius: '12px' }
        }}
      />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
