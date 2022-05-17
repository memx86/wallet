import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { loggedOff, closeModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";

import Modal from "components/Modal";

import s from "./ModalLogout.module.scss";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const { t } = useTranslation();

  const confirm = async () => {
    try {
      await logout();
      cancel();
      dispatch(loggedOff());
    } catch (error) {
      toast.error(t("modalLogout.error"));
    }
  };

  const cancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal modalType={"logout"} closeModal={cancel} modalClassName={s.modal}>
      <span className={s.text}>{t("modalLogout.logout")}</span>
      <div className={s.btnWrapper}>
        <button className={s.btnCancel} onClick={cancel}>
          {t("modalLogout.cancel")}
        </button>
        <button className={s.btnConfirm} onClick={confirm}>
          {t("modalLogout.confirm")}
        </button>
      </div>
    </Modal>
  );
};
export default ModalLogout;
