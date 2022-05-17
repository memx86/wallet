import s from "./RemoveTransaction.module.scss";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useTranslation } from "react-i18next";

import spriteSvg from "assets/images/sprite.svg";
import PropTypes from "prop-types";
import IconButton from "components/IconButton";
import { setModal } from "redux/session";
import { useDispatch } from "react-redux";

const RemoveTransaction = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(MOBILE_ONLY);

  const openModal = () => {
    dispatch(setModal({ isOpen: true, type: "remove", data: { id } }));
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
    </>
  );
};

RemoveTransaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveTransaction;
