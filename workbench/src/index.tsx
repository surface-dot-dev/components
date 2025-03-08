import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, grayScaleLightTheme } from "@surface.dev/core";
import { PostgresValue } from "@surface.dev/postgres";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Content = () => {
  return <PostgresValue value="Hello World!" type="varchar" />;
};

const App = () => {
  return (
    <ThemeProvider theme={grayScaleLightTheme}>
      <main>
        <Content />
      </main>
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
