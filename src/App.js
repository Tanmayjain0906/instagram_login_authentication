import React from "react";
import Login from "./components/Login";
import "./style.css"
import Dashboard from "./components/Dashboard";
import SingUp from "./components/Singup";

import { Route, Routes } from "react-router-dom";

const App = () => {

  return(
    <div>
      <Routes>
        <Route path="/" element={<SingUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App;