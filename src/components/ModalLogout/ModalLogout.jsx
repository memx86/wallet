import s from "./ModalLogout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLogoutSelector, loggedOff, logoutModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";
import { toast } from "react-toastify";
import Modal from "components/Modal";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const isLogout = useSelector(isLogoutSelector);
  const [logout] = useLogoutMutation();

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
    <Modal trigger={isLogout} closeModal={cancel} modalClassName={s.modal}>
      <span className={s.text}>Are you sure you want to logout?</span>
      <div className={s.btnWrapper}>
        <button className={s.btnCancel} onClick={cancel}>
          cancel
        </button>
        <button className={s.btnConfirm} onClick={confirm}>
          confirm
        </button>
      </div>
    </Modal>
  );
};
export default ModalLogout;
