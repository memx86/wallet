import s from "./AuthForm.module.scss";
import { Formik } from "formik";
import spriteSvg from "assets/images/sprite.svg";
import { useRegisterMutation, useLoginMutation } from "redux/wallet/wallet-api";
import { useDispatch } from "react-redux";
import { loggedIn, setToken } from "redux/session";
import { toast } from "react-toastify";
import {
  validationLogin,
  validationsRegister,
} from "assets/schemas/authFormSchemas";
import { Link } from "react-router-dom";

export const authType = {
  login: "login",
  registration: "registration",
};

const AuthForm = ({ type }) => {
  const dispatch = useDispatch();
  const isRegister = type === authType.registration;

  const initialValues = isRegister
    ? {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
    : {
        email: "",
        password: "",
      };

  const [registerAcc] = useRegisterMutation();
  const [loginAcc] = useLoginMutation();

  return (
    <Formik
      initialValues={initialValues}
      validateOnBlur
      onSubmit={async (values) => {
        try {
          const { username, email, password } = values;
          const data = isRegister
            ? { username, email, password }
            : { email, password };

          const callFunction = isRegister ? registerAcc : loginAcc;
          const response = await callFunction(data).unwrap();

          dispatch(setToken(response.token));
          dispatch(loggedIn());
        } catch (error) {
          const message = isRegister
            ? "User with such email already exists"
            : "Email or password is not correct";
          toast.error(message);
        }
      }}
      validationSchema={isRegister ? validationsRegister : validationLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        dirty,
      }) => (
        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.titleWrapper}>
            <svg style={{ width: "30px", height: "30px" }}>
              <use href={`${spriteSvg}#wallet`}></use>
            </svg>
            <h1 className={s.title}>Wallet</h1>
          </div>
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              autoComplete="email"
            />
            <svg className={s.iconSvg} style={{ width: "24px" }}>
              <use href={`${spriteSvg}#email`}></use>
            </svg>
          </div>
          {touched.email && errors.email && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.email}</p>
            </div>
          )}
          <div className={s.inputWrapper}>
            <input
              className={s.input}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete="off"
            />
            <svg className={s.iconSvg} style={{ width: "24px" }}>
              <use href={`${spriteSvg}#lock`}></use>
            </svg>
          </div>
          {touched.password && errors.password && (
            <div className={s.errorWrapper}>
              <p className={s.error}>{errors.password}</p>
            </div>
          )}
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <input
                  className={s.input}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  autoComplete="off"
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#lock`}></use>
                </svg>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.confirmPassword}</p>
                </div>
              )}
            </>
          ) : null}
          {isRegister ? (
            <>
              <div className={s.inputWrapper}>
                <input
                  className={s.input}
                  type="username"
                  name="username"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  autoComplete="off"
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#account-box`}></use>
                </svg>
              </div>
              {touched.username && errors.username && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.username}</p>
                </div>
              )}
            </>
          ) : null}
          <button
            className={s.enterBtn}
            type="submit"
            disabled={!isValid && !dirty}
          >
            {isRegister ? "Register" : "Login"}
          </button>
          {isRegister ? (
            <Link className={s.loginBtn} to="/login">
              Login
            </Link>
          ) : (
            <Link className={s.loginBtn} to="/register">
              Sign Up
            </Link>
          )}
        </form>
      )}
    </Formik>
  );
};
export default AuthForm;
