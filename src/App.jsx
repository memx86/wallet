import { Fragment, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loggedIn, tokenSelector, isAuthSelector } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import Header from "components/Header";
import Home from "pages/Home";
import HomeTab from "components/HomeTab";
import DiagramTab from "components/DiagramTab";
import Registration from "pages/Registration";
import Login from "pages/Login";
import Loader from "components/Loader";
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import CurrencyTab from "components/CurrencyTab";
import GlobalModal from "components/GlobalModal";

const App = () => {
  const token = useSelector(tokenSelector);
  const isAuth = useSelector(isAuthSelector);
  const { isSuccess, isFetching } = useRefreshQuery(null, { skip: !token });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(loggedIn());
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isFetching) return <Loader />;

  return (
    <Suspense fallback={<Loader />}>
      <Fragment>
        {isAuth && <Header />}
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
            <Route path="currency" element={<CurrencyTab />} />
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
        <GlobalModal />
        <ToastContainer hideProgressBar />
      </Fragment>
    </Suspense>
  );
};
export default App;
