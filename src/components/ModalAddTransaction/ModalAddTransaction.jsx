import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

import { categoriesSelector } from "redux/categories";
import { isTransactionModalSelector, transactionModal } from "redux/session";
import { useAddTransactionMutation } from "redux/wallet";

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
  const [addTransaction] = useAddTransactionMutation();

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
      const res = await addTransaction(data).unwrap();
      if (res) {
        toast.success("Transaction added");
        closeModal();
      }
    } catch (error) {
      toast.error("Can't add transaction");
    }
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
          categoryId: selectFields?.at(0)?.at(0),
          amount: "",
          transactionDate: "",
          comment: "",
        }}
        onSubmit={onSubmit}
      >
        {({ values }) => (
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
              <Field
                className={s.half}
                type="number"
                name="amount"
                min="0"
                max="9999999"
                placeholder="0.00"
                required
                autoComplete="off"
              />
              <div className={s.wrapper}>
                <DatePickerField
                  name="transactionDate"
                  className={s.half}
                  maxDate={new Date()}
                  placeholderText="Select a date"
                  dateFormat="dd.MM.yyyy"
                  required
                  autoComplete="off"
                />
                <MdDateRange className={s.dateIcon} />
              </div>
            </div>
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
