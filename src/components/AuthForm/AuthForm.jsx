import s from "./AuthForm.module.scss";
import { Formik } from "formik";
import * as yup from "yup";

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
    .oneOf([yup.ref("password")], "Password must match")
    .required("Confirm password is required"),
});

const AuthForm = ({ type }) => {
  return (
    <>
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

            <label htmlFor="name"></label>
            <input
              className={s.input}
              id="name"
              type="name"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {touched.name && errors.name && (
              <p className={s.error}>{errors.name}</p>
            )}
            <label htmlFor="email"></label>
            <input
              className={s.input}
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
              className={s.input}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {touched.password && errors.password && (
              <p className={s.error}>{errors.password}</p>
            )}
            <label htmlFor="confirmPassword"></label>
            <input
              className={s.input}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={handleChange}
              onBlur={handleBlur}
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
    </>
  );
};
export default AuthForm;
