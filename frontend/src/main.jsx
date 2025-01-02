import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
/* 
application in development mode and React Strict Mode is enabled, React intentionally renders components twice in development to help identify side effects. This does not happen in production builds.

Why it happens: Strict Mode is a development tool that helps identify unsafe lifecycle methods, deprecated APIs, and other potential issues in your application. It renders components twice to simulate the behavior and catch issues early.
*/
// createRoot(document.getElementById("root")).render(<App />);
