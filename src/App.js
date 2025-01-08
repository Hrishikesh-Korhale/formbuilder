import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import { BrowserRouter } from "react-router-dom";
import CreateNewForm from "./components/CreateNewForm";
import ViewForm from "./components/viewform";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form/create" element={<CreateNewForm />} />
        <Route path="/form/edit/:id" element={<CreateNewForm />} /> 
        <Route path="/form/view/:id" element={<ViewForm />} />   
      </Routes>
    </BrowserRouter>
    </DndProvider>
  );
};

export default App;
