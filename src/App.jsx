import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "pages/Home";
import Registration from "pages/Registration";
import Login from "pages/Login";
import DiagramTab from "components/DiagramTab";
import Header from "components/Header";
import Container from "components/Container";

// Для примера
import Currency from "components/Currency";
//

const App = () => {
  return (
    <Fragment>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diagram" element={<DiagramTab />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
      {/*  */}
      <Currency />
      {/*  */}
      <ToastContainer hideProgressBar />
    </Fragment>
  );
};
export default App;
