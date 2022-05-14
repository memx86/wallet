import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

import { categoriesSelector } from "redux/categories";
import { useEditTransactionMutation } from "redux/wallet";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Modal from "components/Modal/Modal";
import IconButton from "components/IconButton";
import DatePickerField from "components/DatePickerField";

import s from "./ModalEditTransaction.module.scss";

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const ModalEditTransaction = ({ el, onClose }) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const categories = useSelector(categoriesSelector);
  const [editTransaction, data] = useEditTransactionMutation();
  console.log("data", data);
  const {
    amount,

    categoryId,
    comment,
    id,
    transactionDate,
    type,
  } = el;

  const selectFields = [];
  let incomeCategoryId;
  Object.entries(categories).forEach(([id, category]) => {
    if (category === "Income") {
      incomeCategoryId = id;
      return;
    }
    selectFields.push([id, category]);
  });

  const onSubmit = async (values) => {
    const data = {
      ...values,
      id: id,
      categoryId: values.type ? values.categoryId : incomeCategoryId,
      amount: values.type ? values.amount * -1 : values.amount,
      type: values.type ? TYPES.EXPENSE : TYPES.INCOME,
    };
    try {
      editTransaction(data);
      // const res = await addTransaction(data).unwrap();
      // console.log("data", data);
      // dispatch(editTransactionThunk(data));
      // console.log("data", data);
      // if (res) {
      //   toast.success("Transaction added");
      //   onClose();
      // }
    } catch (error) {
      toast.error("Can't add transaction");
    }
    onClose();
  };
  return (
    <Modal modalClassName={s.modal} closeModal={onClose}>
      {!isMobile && (
        <IconButton onClick={onClose} label="Close window">
          <GrClose className={s.close} />
        </IconButton>
      )}
      <h2 className={s.title}>Edit transaction</h2>
      <Formik
        initialValues={{
          type: type === "INCOME" ? false : true,
          categoryId: categoryId,
          amount: Math.abs(amount),
          transactionDate: transactionDate,
          comment: comment,
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
              Change transaction
            </button>
          </Form>
        )}
      </Formik>
      <button type="button" onClick={onClose} className={s.btnCancel}>
        Cancel
      </button>
    </Modal>
  );
};
export default ModalEditTransaction;
