import s from "./ModalLogout.module.scss";
import { useDispatch } from "react-redux";
import { loggedOff, logoutModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";
import { toast } from "react-toastify";
import Modal from "components/Modal";
// import { Spring, animated } from "react-spring";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const confirm = async () => {
    try {
      await logout().unwrap();
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
    <Modal closeModal={cancel} modalClassName={s.modal}>
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
