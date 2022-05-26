import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import { setModal } from "redux/session";

import useTranslation from "assets/hooks/useTranslation";

import spriteSvg from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import IconButton from "components/IconButton";

import s from "./RemoveTransaction.module.scss";

const RemoveTransaction = ({ id }) => {
  const { t } = useTranslation("removeTransaction");
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(MOBILE_ONLY);

  const openModal = () => {
    dispatch(setModal({ isOpen: true, type: "remove", data: { id } }));
  };

  return (
    <IconButton
      onClick={openModal}
      label={t.remove}
      className={isMobile ? s.remove : s.button}
    >
      <svg className={isMobile ? s.removeIcon : s.icon}>
        <use href={`${spriteSvg}#bin`}></use>
      </svg>
    </IconButton>
  );
};

RemoveTransaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveTransaction;
