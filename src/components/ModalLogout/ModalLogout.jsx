import s from "./ModalLogout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLogoutSelector, loggedOff, logoutModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Modal from "components/Modal";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const isLogout = useSelector(isLogoutSelector);
  const [logout] = useLogoutMutation();
  const { t } = useTranslation();
  const confirm = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged off");
      dispatch(logoutModal(false));
      dispatch(loggedOff());
    } catch (error) {
      toast.error("Can't log out");
    }
  };

  const cancel = () => {
    dispatch(logoutModal(false));
  };

  return (
    isLogout && (
      <Modal closeModal={cancel} modalClassName={s.modal}>
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
    )
  );
};
export default ModalLogout;
