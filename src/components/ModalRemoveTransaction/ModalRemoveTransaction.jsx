import s from "./ModalRemoveTransaction.module.scss";
import { useDeleteTransactionMutation } from "redux/wallet/wallet-api";
import Modal from "components/Modal/Modal";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { modalDataSelector, closeModal } from "redux/session";

const ModalRemoveTransaction = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [removal] = useDeleteTransactionMutation();
  const { id } = useSelector(modalDataSelector);

  const removeItem = async () => {
    try {
      const response = await removal(id).unwrap();
      if (response) {
        toast.success(t("removeTransaction.success"));
      }
    } catch (error) {
      toast.error(t("removeTransaction.error"));
    } finally {
      cancel();
    }
  };

  const cancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      modalClassName={s.modal}
      closeModal={cancel}
      modalType={"remove"}
      children={
        <>
          <span className={s.text}>{t("removeTransaction.pleaseConfirm")}</span>
          <div className={s.btnWrapper}>
            <button className={s.btnCancel} onClick={cancel}>
              {t("removeTransaction.cancel")}
            </button>
            <button className={s.btnConfirm} onClick={removeItem}>
              {t("removeTransaction.confirm")}
            </button>
          </div>
        </>
      }
    />
  );
};

export default ModalRemoveTransaction;
