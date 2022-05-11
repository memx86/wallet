import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loggedIn, tokenSelector } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import Home from "pages/Home";
import Registration from "pages/Registration";
import Login from "pages/Login";
import DiagramTab from "components/DiagramTab";
import Header from "components/Header";
import Container from "components/Container";
import Loader from "components/Loader";

const App = () => {
  const token = useSelector(tokenSelector);
  const { isSuccess, isFetching } = useRefreshQuery(null, { skip: !token });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedIn());
    }
  }, [dispatch, isSuccess]);

  if (isFetching) return <Loader />;

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
      <ToastContainer hideProgressBar />
    </Fragment>
  );
};
export default App;
