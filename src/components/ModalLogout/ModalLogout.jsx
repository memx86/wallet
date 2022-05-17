import s from "./ModalLogout.module.scss";
import ModalAnimation from "../ModalLogout/";
import { useDispatch, useSelector } from "react-redux";
import { isLogoutSelector, loggedOff, logoutModal } from "redux/session";
import { useLogoutMutation } from "redux/wallet";
import { toast } from "react-toastify";
import Modal from "components/Modal";
// import { Spring, animated } from "react-spring";
import {
  Transition,
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

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
    isLogout && (
      <TransitionGroup>
        <CSSTransition in={isLogout} timeout={1000} classNames={s.node}>
          <Modal
            trigger={isLogout}
            closeModal={cancel}
            modalClassName={s.modal}
          >
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
        </CSSTransition>
      </TransitionGroup>
    )
  );
};
export default ModalLogout;
