import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";

import { categoriesSelector } from "redux/categories";
import { isTransactionModalSelector, transactionModal } from "redux/session";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Modal from "components/Modal/Modal";
import IconButton from "components/IconButton";
import DatePickerField from "components/DatePickerField";

import s from "./ModalAddTransaction.module.scss";

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const ModalAddTransaction = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isTransactionModal = useSelector(isTransactionModalSelector);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();

  const selectFields = Object.entries(categories).filter(
    ([, category]) => category !== "Income"
  );

  const closeModal = () => {
    dispatch(transactionModal(false));
  };

  const onSubmit = (values) => {
    const data = {
      ...values,
      amount: values.type ? values.amount * -1 : values.amount,
      type: values.type ? TYPES.EXPENSE : TYPES.INCOME,
    };
    console.log("data", data);
  };
  return isTransactionModal ? (
    <Modal modalClassName={s.modal} closeModal={closeModal}>
      {!isMobile && (
        <IconButton onClick={closeModal} label="Close window">
          <GrClose className={s.close} />
        </IconButton>
      )}
      <h2 className={s.title}>Add transaction</h2>
      <Formik
        initialValues={{
          type: true,
          categoryId: "",
          amount: "",
          transactionDate: "",
          comment: "",
        }}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span className={s.income}>Income</span>
              <span className={s.wrapper}>
                <Field type="checkbox" name="type" className={s.type} />
                <span className={s.check}></span>
              </span>
              <span className={s.expense}>Expense</span>
            </label>
            {values.type && (
              <Field name="categoryId" as="select" className={s.input}>
                {selectFields.map(([categoryId, category]) => (
                  <option value={categoryId} key={categoryId}>
                    {category}
                  </option>
                ))}
              </Field>
            )}
            <Field
              className={s.input}
              type="number"
              name="amount"
              min="0"
              placeholder="0.00"
              autoComplete="off"
            />
            <DatePickerField
              name="transactionDate"
              className={s.input}
              autoComplete="off"
            />
            <Field
              className={s.textarea}
              as="textarea"
              name="comment"
              rows="3"
              placeholder="Comment"
              autoComplete="off"
            />
            <button className={s.btnConfirm} type="submit">
              Add transaction
            </button>
          </Form>
        )}
      </Formik>
      <button type="button" onClick={closeModal} className={s.btnCancel}>
        Cancel
      </button>
    </Modal>
  ) : null;
};
export default ModalAddTransaction;
