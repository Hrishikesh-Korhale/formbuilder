import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { BrowserRouter } from "react-router-dom";
import CreateNewForm from "./components/CreateNewForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateNewForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
