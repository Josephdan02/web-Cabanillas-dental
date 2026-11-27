import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento raíz de la aplicación.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);

function loadAssistant() {
  const assistantScript = document.createElement("script");
  assistantScript.type = "module";
  assistantScript.src = "/assistant/assistant.js";
  document.body.appendChild(assistantScript);
}

const assistantStyles = document.createElement("link");
assistantStyles.rel = "stylesheet";
assistantStyles.href = "/assistant/assistant.css";
assistantStyles.addEventListener("load", loadAssistant, { once: true });
assistantStyles.addEventListener(
  "error",
  () => {
    console.error("[assistant] Could not load /assistant/assistant.css.");
    loadAssistant();
  },
  { once: true }
);
document.head.appendChild(assistantStyles);
