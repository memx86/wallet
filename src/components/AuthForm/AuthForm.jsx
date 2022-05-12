import s from "./AuthForm.module.scss";
import { Formik } from "formik";
import * as yup from "yup";
import spriteSvg from "assets/images/form-images/sprite.svg";

export const authType = {
  login: "login",
  registration: "registration",
};

const validationsSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Name must be at least 1 characters")
    .max(12, "Name must not contain more than 12 characters")
    .required("Name is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must not contain more than 12 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain six characters, at least one letter and one number"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

const AuthForm = ({ type }) => {
  const isRegister = type === authType.registration;

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnBlur
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
        console.log(values);
      }}
      validationSchema={validationsSchema}
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
                  type="name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <svg className={s.iconSvg} style={{ width: "24px" }}>
                  <use href={`${spriteSvg}#account-box`}></use>
                </svg>
              </div>
              {touched.name && errors.name && (
                <div className={s.errorWrapper}>
                  <p className={s.error}>{errors.name}</p>
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
          <button className={s.loginBtn} type="button">
            {isRegister ? "Login" : "Sign Up"}
          </button>
        </form>
      )}
    </Formik>
  );
};
export default AuthForm;
