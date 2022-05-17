import s from "./RemoveTransaction.module.scss";
import Modal from "components/Modal/Modal";
import { useDeleteTransactionMutation } from "redux/wallet/wallet-api";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import spriteSvg from "assets/images/sprite.svg";
import { useState } from "react";
import PropTypes from "prop-types";
import IconButton from "components/IconButton";

let elementId = null;

const RemoveTransaction = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const [removal] = useDeleteTransactionMutation();

  const { t } = useTranslation();
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
          <IconButton onClick={openModal} label={t("removeTransaction.remove")}>
            <svg className={s.removeIcon}>
              <use href={`${spriteSvg}#bin`}></use>
            </svg>
          </IconButton>
        </div>
      ) : (
        <IconButton onClick={openModal} label={t("removeTransaction.remove")}>
          <svg width="20px" height="20px" className={s.icon}>
            <use href={`${spriteSvg}#bin`}></use>
          </svg>
        </IconButton>
      )}
      {isOpen && (
        <Modal
          modalClassName={s.modal}
          closeModal={cancel}
          children={
            <div className={s.modal}>
              <span className={s.text}>
                {t("removeTransaction.pleaseConfirm")}
              </span>
              <div className={s.btnWrapper}>
                <button className={s.btnCancel} onClick={cancel}>
                  {t("removeTransaction.cancel")}
                </button>
                <button className={s.btnConfirm} onClick={removeItem}>
                  {t("removeTransaction.confirm")}
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
