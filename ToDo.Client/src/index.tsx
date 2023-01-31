import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import TodoApi from "./services/TodoApi";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
const baseUrl: string = "http://localhost:5000"

let todoApi = new TodoApi(baseUrl);


root.render(
  <React.StrictMode>
    <App todoApi ={todoApi} />
  </React.StrictMode>
);
