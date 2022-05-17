import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";

import spriteSvg from "assets/images/sprite.svg";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import ModalAddTransaction from "components/ModalAddTransaction";
import IconButton from "components/IconButton/IconButton";

import s from "./EditTransaction.module.scss";

const EditTransaction = ({ ...props }) => {
  const [editModal, setEditModal] = useState(false);
  const { t } = useTranslation();

  const handleClickEdit = () => {
    setEditModal(!editModal);
  };

  const isMobile = useMediaQuery(MOBILE_ONLY);

  return (
    <>
      {isMobile ? (
        <div className={s.edit}>
          <IconButton
            onClick={handleClickEdit}
            label={t("modalEditTransaction.editTransaction")}
          >
            <svg className={s.iconMobile}>
              <use href={`${spriteSvg}#icon_pencil2`}></use>
            </svg>
          </IconButton>
        </div>
      ) : (
        <IconButton
          onClick={handleClickEdit}
          label={t("modalEditTransaction.editTransaction")}
        >
          <svg className={s.icon}>
            <use href={`${spriteSvg}#icon_pencil2`}></use>
          </svg>
        </IconButton>
      )}

      {editModal && (
        <ModalAddTransaction
          editModal={editModal}
          transaction={props}
          closeEditModal={handleClickEdit}
        />
      )}
    </>
  );
};

export default EditTransaction;
