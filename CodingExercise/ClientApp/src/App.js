import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./custom.css";
import LoginMenu from "./components/login/LoginMenu";
import Table from "./components/table/Table";
import Registration from "./components/registration/Registration";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <>
      <Layout />
      <Routes>
        <Route path="/login" element={<LoginMenu />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/" element={<Table />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
