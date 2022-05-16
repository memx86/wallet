import s from "./RemoveTransaction.module.scss";
import Modal from "components/Modal/Modal";
import { useDeleteTransactionMutation } from "redux/wallet/wallet-api";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { toast } from "react-toastify";
import spriteSvg from "assets/images/sprite.svg";
import { useState } from "react";
import PropTypes from "prop-types";

let elementId = null;

const RemoveTransaction = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const [removal] = useDeleteTransactionMutation();

  const openModal = () => {
    elementId = id;
    setIsOpen(!isOpen);
  };

  const removeItem = async () => {
    try {
      const response = await removal(elementId).unwrap();
      if (response) {
        toast.success("Transaction successfully removed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsOpen(false);
    }
  };

  const cancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <div className={s.remove}>
          <svg className={s.removeIcon} onClick={openModal}>
            <use href={`${spriteSvg}#bin`}></use>
          </svg>
        </div>
      ) : (
        <svg width="20px" height="20px" className={s.icon} onClick={openModal}>
          <use href={`${spriteSvg}#bin`}></use>
        </svg>
      )}

      {isOpen && (
        <Modal
          modalClassName={s.modal}
          closeModal={cancel}
          children={
            <div className={s.modal}>
              <span className={s.text}>Please confirm removal</span>
              <div className={s.btnWrapper}>
                <button className={s.btnCancel} onClick={cancel}>
                  cancel
                </button>
                <button className={s.btnConfirm} onClick={removeItem}>
                  confirm
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

RemoveTransaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveTransaction;
