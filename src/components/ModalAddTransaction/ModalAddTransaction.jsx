import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { GrClose } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { categoriesSelector } from "redux/categories";
import { isTransactionModalSelector, transactionModal } from "redux/session";
import {
  useAddTransactionMutation,
  useEditTransactionMutation,
} from "redux/wallet";

import { useTranslation } from "react-i18next";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import TransactionSchema from "assets/schemas/transactionSchema";

import Modal from "components/Modal/Modal";
import IconButton from "components/IconButton";
import Select from "components/Select";
import DatePickerField from "components/DatePickerField";

import s from "./ModalAddTransaction.module.scss";

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const ModalAddTransaction = ({ editModal, closeEditModal, transaction }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isTransactionModal = useSelector(isTransactionModalSelector);
  const categories = useSelector(categoriesSelector);
  const dispatch = useDispatch();
  const [addTransaction] = useAddTransactionMutation();
  const [editTransaction] = useEditTransactionMutation();

  const selectFields = categories
    ? []
    : [
        [
          "c9d9e447-1b83-4238-8712-edc77b18b739",
          t("modalAddTransaction.nocategories"),
        ],
      ];
  let incomeCategoryId = "063f1132-ba5d-42b4-951d-44011ca46262";
  categories &&
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

  const now = dayjs().format("DD.MM.YYYY");

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
        toast.success(
          editModal
            ? t("modalEditTransaction.success")
            : t("modalAddTransaction.success")
        );
        editModal ? closeEditModal() : closeModal();
      }
    } catch (error) {
      toast.error(
        editModal
          ? t("modalEditTransaction.error")
          : t("modalAddTransaction.error")
      );
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
          label={t("modalAddTransaction.closewindow")}
        >
          <GrClose className={s.close} />
        </IconButton>
      )}
      <h2 className={s.title}>
        {editModal
          ? t("modalEditTransaction.editTransaction")
          : t("modalAddTransaction.addTransaction")}
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
        validationSchema={TransactionSchema(t)}
      >
        {({ values, isValid, handleBlur, setFieldValue }) => (
          <Form className={s.form}>
            <label className={s.label}>
              <span
                className={s.income}
                style={values.type ? { color: "#e0e0e0" } : null}
              >
                {t("modalAddTransaction.income")}
              </span>
              <span className={s.wrapper}>
                <Field type="checkbox" name="type" className={s.type} />
                <span className={s.check}></span>
              </span>
              <span
                className={s.expense}
                style={!values.type ? { color: "#e0e0e0" } : null}
              >
                {t("modalAddTransaction.expense")}
              </span>
            </label>
            {values.type && (
              <Select
                options={selectFields}
                name="categoryId"
                containerClassName={s.input}
              />
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
                  placeholderText={now}
                  dateFormat="dd.MM.yyyy"
                  autoComplete="off"
                />
                <MdDateRange className={s.dateIcon} />
              </div>
            </div>
            <label className={s.wrapper}>
              <Field
                className={s.input}
                type="text"
                name="comment"
                placeholder={t("modalAddTransaction.comment")}
                autoComplete="off"
              />
              <span className={s.error}>
                <ErrorMessage name="comment" />
              </span>
            </label>
            <button className={s.btnConfirm} type="submit" disabled={!isValid}>
              {editModal
                ? t("modalEditTransaction.transaction")
                : t("modalAddTransaction.transaction")}
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={editModal ? closeEditModal : closeModal}
        className={s.btnCancel}
      >
        {t("modalAddTransaction.cancel")}
      </button>
    </Modal>
  ) : null;
};
export default ModalAddTransaction;

ModalAddTransaction.propTypes = {
  editModal: PropTypes.bool,
  closeEditModal: PropTypes.func,
  transaction: PropTypes.shape({
    id: PropTypes.string,
    transactionDate: PropTypes.string,
    type: PropTypes.string,
    categoryId: PropTypes.string,
    comment: PropTypes.string,
    amount: PropTypes.number,
    balanceAfter: PropTypes.number,
  }),
};
