import React, { useState, useMemo } from "react"; 
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from './App.tsx'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";

export const Root = () => {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    console.log("Switching to:",newMode);
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <App toggleTheme={toggleTheme} mode={mode} />
      </ThemeProvider>
    </Provider>
  );
}; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);