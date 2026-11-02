
import React from "react";
import ReactDOM from "react-dom/client";
import App from './app/App.jsx'
// reactdom--->Connects React to the browser DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
