import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, grayScaleLightTheme } from "@surface.dev/core";
import { PostgresColumnName, PostgresColumnValue } from "@surface.dev/postgres";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const Content = () => {
  const name = "full_name";
  const value = "John Doe";
  const dataType = "varchar";

  return (
    <div>
      <PostgresColumnName dataType={dataType}>{name}</PostgresColumnName>
      <PostgresColumnValue dataType={dataType} columnName={name}>
        {value}
      </PostgresColumnValue>
    </div>
  );
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
