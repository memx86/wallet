import * as yup from "yup";

const validationsRegister = yup.object().shape({
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

const validationLogin = yup.object().shape({
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
});

export { validationLogin, validationsRegister };
