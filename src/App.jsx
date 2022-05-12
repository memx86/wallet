import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loggedIn, tokenSelector, isAuthSelector } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import Header from "components/Header";
import Home from "pages/Home";
import DiagramTab from "components/DiagramTab";
import Registration from "pages/Registration";
import Login from "pages/Login";
import Container from "components/Container";
import Loader from "components/Loader";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import Currency from "components/Currency";
import HomeTab from "components/HomeTab";

const App = () => {
  const token = useSelector(tokenSelector);
  const isAuth = useSelector(isAuthSelector);
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
      {isAuth && <Header />}
      <Container>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="home"
              element={
                <PrivateRoute>
                  <HomeTab />
                </PrivateRoute>
              }
            />
            <Route
              path="diagram"
              element={
                <PrivateRoute>
                  <DiagramTab />
                </PrivateRoute>
              }
            />
            <Route path="currency" element={<Currency />} />
          </Route>
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
