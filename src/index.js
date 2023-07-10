import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "../public/images/favicon_package_v0.16/android-chrome-192x192.png";
// import "../public/images/favicon_package_v0.16/android-chrome-512x512.png";
// import "../public/images/favicon_package_v0.16/apple-touch-icon.png";
// import "../public/images/favicon_package_v0.16/favicon-16x16.png";
// import "../public/images/favicon_package_v0.16/favicon-32x32.png";
// import "../public/images/favicon_package_v0.16/mstile-150x150.png";
// import "../public/images/favicon_package_v0.16/safari-pinned-tab.svg";
// import safariPinnedTab from "../public/images/favicon_package_v0.16/safari-pinned-tab.svg";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
