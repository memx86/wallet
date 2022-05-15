import * as yup from "yup";

const transactionSchema = yup.object().shape({
  type: yup.boolean().required("Type is required"),
  categoryId: yup.string().required("Category is required"),
  amount: yup
    .string()
    .min(1)
    .max(8)
    .matches(
      /^(?:\d*\.)?\d+$/,
      "Only numbers and . allowed, max 2 symbols after dot"
    )
    .required("Amount is required"),
  transactionDate: yup.date().required("Date is required"),
  comment: yup
    .string()
    .matches(/^[a-zA-Z\s]+$/, "Only alphabet symbols allowed"),
});

export default transactionSchema;
