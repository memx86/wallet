import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.scss";

function Modal({ children, closeModal, modalClassName = "" }) {
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onEsc(e) {
    if (e.code === "Escape") closeModal();
  }
  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className={s.backdrop} onClick={onBackdropClick}>
      <div className={modalClassName}>{children}</div>
    </div>
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalClassName: PropTypes.string,
};

export default Modal;
