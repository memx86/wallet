import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "pages/Home";
import Registration from "pages/Registration";
import Login from "pages/Login";
import DiagramTab from "components/DiagramTab";

const App = () => {
  return (
    <Fragment>
      App
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/diagram" element={<DiagramTab />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <ToastContainer hideProgressBar />
    </Fragment>
  );
};
export default App;
