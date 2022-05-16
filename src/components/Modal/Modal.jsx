import { useEffect } from "react";
import PropTypes from "prop-types";
import s from "./Modal.module.scss";
import { Spring, animated, useSpring } from "react-spring";

function Modal({ trigger, children, closeModal, modalClassName = "" }) {
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

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  return (
    trigger && (
      <animated.div
        style={props}
        className={s.backdrop}
        onClick={onBackdropClick}
      >
        <div className={modalClassName}>{children}</div>
      </animated.div>
    )
  );
}
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  modalClassName: PropTypes.string,
};

export default Modal;
