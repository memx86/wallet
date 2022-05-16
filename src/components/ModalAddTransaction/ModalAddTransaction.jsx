import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

import { categoriesSelector } from "redux/categories";
import { isTransactionModalSelector, transactionModal } from "redux/session";
import {
  useAddTransactionMutation,
  useEditTransactionMutation,
} from "redux/wallet";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import transactionSchema from "assets/schemas/transactionSchema";

import Modal from "components/Modal/Modal";
import IconButton from "components/IconButton";
import DatePickerField from "components/DatePickerField";

import s from "./ModalAddTransaction.module.scss";

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const ModalAddTransaction = ({ editModal, closeEditModal, transaction }) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isTransactionModal = useSelector(isTransactionModalSelector);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();
  const [addTransaction] = useAddTransactionMutation();
  const [editTransaction] = useEditTransactionMutation();

  const selectFields = [];
  let incomeCategoryId;
  Object.entries(categories).forEach(([id, category]) => {
    if (category === "Income") {
      incomeCategoryId = id;
      return;
    }
    selectFields.push([id, category]);
  });

  const closeModal = () => {
    dispatch(transactionModal(false));
  };

  const prepareDate = (date) => {
    const currentDate = new Date();
    const timeZone = currentDate.getTimezoneOffset();
    const currentTime = (currentDate.getTime() - 60000 * timeZone) % 86400000;
    const initialDate = new Date(date).getTime();
    const result = new Date(initialDate + currentTime);
    return result.toISOString();
  };

  const onSubmit = async (values) => {
    const data = {
      ...values,
      transactionDate: prepareDate(values.transactionDate),
      categoryId: values.type ? values.categoryId : incomeCategoryId,
      amount: values.type ? values.amount * -1 : values.amount,
      type: values.type ? TYPES.EXPENSE : TYPES.INCOME,
    };
    try {
      const res = editModal
        ? await editTransaction({ ...data, id: transaction.id }).unwrap()
        : await addTransaction(data).unwrap();
      if (res) {
        toast.success("Transaction added");
        editModal ? closeEditModal() : closeModal();
      }
    } catch (error) {
      toast.error("Can't add transaction");
    }
  };

  const handleAmount = (value) => {
    if (!value || Number.isNaN(Number(value))) return value;
    const length = value.length;
    const dotIndex = value.indexOf(".");

    if (dotIndex < 0) {
      return value.concat(".00");
    }

    if (dotIndex < length - 3) {
      return value.slice(0, dotIndex + 3);
    }

    if (dotIndex > length - 3) {
      return value.padEnd(dotIndex + 3, "0");
    }

    return value;
  };

  return isTransactionModal || editModal ? (
    <Modal
      modalClassName={s.modal}
      closeModal={editModal ? closeEditModal : closeModal}
    >
      {!isMobile && (
        <IconButton
          onClick={editModal ? closeEditModal : closeModal}
          label="Close window"
        >
          <GrClose className={s.close} />
        </IconButton>
      )}
      <h2 className={s.title}>
        {editModal ? "Edit transaction" : "Add transaction"}
      </h2>
      <Formik
        initialValues={{
          type: transaction?.type === "INCOME" ? false : true,
          categoryId: editModal
            ? transaction.categoryId
            : selectFields?.at(0)?.at(0),
          amount: editModal ? Math.abs(transaction?.amount) : "",
          transactionDate: editModal ? transaction?.transactionDate : "",
          comment: editModal ? transaction?.comment : "",
        }}
        onSubmit={onSubmit}
        validateOnBlur
        validationSchema={transactionSchema}
      >
        {({ values, isValid, handleBlur, setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span
                className={s.income}
                style={values.type ? { color: "#e0e0e0" } : null}
              >
                Income
              </span>
              <span className={s.wrapper}>
                <Field type="checkbox" name="type" className={s.type} />
                <span className={s.check}></span>
              </span>
              <span
                className={s.expense}
                style={!values.type ? { color: "#e0e0e0" } : null}
              >
                Expense
              </span>
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
            <div className={s.double}>
              <label className={s.wrapper}>
                <Field
                  className={s.half}
                  type="text"
                  name="amount"
                  onBlur={(e) => {
                    const { value } = e.target;
                    setFieldValue("amount", handleAmount(value));
                    handleBlur(e);
                  }}
                  placeholder="0.00"
                  autoComplete="off"
                />
                <span className={s.errorAmount}>
                  <ErrorMessage name="amount" />
                </span>
              </label>
              <div className={s.wrapper}>
                <DatePickerField
                  name="transactionDate"
                  className={s.half}
                  maxDate={new Date()}
                  placeholderText="Select a date"
                  dateFormat="dd.MM.yyyy"
                  autoComplete="off"
                />
                <MdDateRange className={s.dateIcon} />
              </div>
            </div>
            <label className={s.wrapper}>
              <Field
                className={s.textarea}
                as="textarea"
                name="comment"
                rows="3"
                placeholder="Comment"
                autoComplete="off"
              />
              <span className={s.error}>
                <ErrorMessage name="comment" />
              </span>
            </label>
            <button className={s.btnConfirm} type="submit" disabled={!isValid}>
              {editModal ? "Change transaction" : "Add transaction"}
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={editModal ? closeEditModal : closeModal}
        className={s.btnCancel}
      >
        Cancel
      </button>
    </Modal>
  ) : null;
};
export default ModalAddTransaction;
