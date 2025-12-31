import React from "react";
import { BookSetProvider } from "./context/BookSetContext.jsx";
import Dashboard from "./pages/Dashboard.jsx";
// import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
    <BookSetProvider>
      <Dashboard />
    </BookSetProvider>
  );
}

export default App;
