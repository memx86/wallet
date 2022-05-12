import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loggedIn, tokenSelector, isAuthSelector } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import { setToken } from "redux/session";
import Header from "components/Header";
import Home from "pages/Home";
import DiagramTab from "components/DiagramTab";
import Dashboard from "components/Dashboard";
import Registration from "pages/Registration";
import Login from "pages/Login";
import Container from "components/Container";
import Loader from "components/Loader";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import Currency from "components/Currency";

const App = () => {
  const token = useSelector(tokenSelector);
  const isAuth = useSelector(isAuthSelector);
  const { isSuccess, isFetching } = useRefreshQuery(null, { skip: !token });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiI5YzkxYTdhZC03NWI4LTQxZDUtOWNhYS0yOWI0MjRhYjkxMzUiLCJpYXQiOjE2NTIzNDEzOTUsImV4cCI6MTAwMDAwMDE2NTIzNDEzOTZ9.cIXdtNwSx1HmJ4sAZpJTbZz9XB1Sza0ETe9O98OhGDU"
      )
    );
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedIn());
    }
  }, [dispatch, isSuccess]);

  if (isFetching) return <Loader />;

  return (
    <Fragment>
      {isAuth && <Header />}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/diagram"
            element={
              <PrivateRoute>
                <DiagramTab />
              </PrivateRoute>
            }
          />
          <Route path="/currency" element={<Currency />} />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Container>
      <ToastContainer hideProgressBar />
    </Fragment>
  );
};
export default App;
