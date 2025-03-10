import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, grayScaleLightTheme } from "@surface.dev/core";
import { PostgresDataTable } from "@surface.dev/postgres";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const columns = [
  { name: "first_name", dataType: "varchar" },
  { name: "last_name", dataType: "varchar" },
  { name: "age", dataType: "int" },
];

const rows = [
  { first_name: "John", last_name: "Doe", age: 30 },
  { first_name: "Jane", last_name: "Smith", age: 25 },
];

const App = () => {
  return (
    <ThemeProvider theme={grayScaleLightTheme}>
      <main>
        <PostgresDataTable columns={columns} rows={rows} />
      </main>
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
