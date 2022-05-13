import s from "./ModalLogout.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { isLogoutSelector, loggedOff, logoutModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";
import { toast } from "react-toastify";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const isLogout = useSelector((state) => isLogoutSelector(state));
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
    isLogout && (
      <div className={s.backdrop}>
        <div className={s.modal}>
          <span className={s.text}>Are you sure you want to logout?</span>
          <div className={s.btnWrapper}>
            <button className={s.btnCancel} onClick={cancel}>
              cancel
            </button>
            <button className={s.btnConfirm} onClick={confirm}>
              confirm
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default ModalLogout;
