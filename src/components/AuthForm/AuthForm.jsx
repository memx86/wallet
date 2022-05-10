import s from "./AuthForm.module.scss";
import { Formik } from "formik";
import * as yup from "yup";

const AuthForm = () => {
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
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  return (
    <div>
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
          <div className={s.form}>
            <div>
              <img src="" alt="" className={s.image} />
              <h1 className={s.title}>Wallet</h1>
            </div>

            <label htmlFor="email"></label>
            <input
              className={s.email}
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {touched.email && errors.email && (
              <p className={s.error}>{errors.email}</p>
            )}
            <label htmlFor="password"></label>
            <input
              className={s.password}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className={s.error}>{errors.password}</p>
            )}
            <label htmlFor="confirmPassword"></label>
            <input
              className={s.password}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              value={values.confirmPassword}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className={s.error}>{errors.confirmPassword}</p>
            )}
            <button
              className={s.enter}
              type="submit"
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
            >
              Login
            </button>
            <button className={s.login} type="button">
              Sign Up
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
};
export default AuthForm;
