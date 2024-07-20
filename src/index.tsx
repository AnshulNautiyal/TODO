import React from "react";
import ReactDOM from "react-dom/client";
import TodoApplication from "./TodoApplication";
import ErrorBoundary from "./ErrorBoundary";
import "@ionic/react/css/core.css";
import { setupIonicReact } from "@ionic/react";
setupIonicReact();

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <TodoApplication />
    </ErrorBoundary>
  </React.StrictMode>,
);
