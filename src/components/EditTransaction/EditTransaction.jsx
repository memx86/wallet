import spriteSvg from "assets/images/sprite.svg";

import s from "./EditTransaction.module.scss";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import ModalEditTransaction from "components/ModalEditTransaction";
import { useState } from "react";

const EditTransaction = ({ ...props }) => {
  const [editModal, setEditModal] = useState(false);

  const handleClickEdit = (e) => {
    setEditModal(!editModal);
  };

  const onClose = () => {
    setEditModal(!editModal);
  };

  const isMobile = useMediaQuery(MOBILE_ONLY);

  return (
    <>
      {isMobile ? (
        <div className={s.edit}>
          <svg className={s.iconMobile} onClick={handleClickEdit}>
            <use href={`${spriteSvg}#icon_pencil2`}></use>
          </svg>
        </div>
      ) : (
        <svg className={s.icon} onClick={handleClickEdit}>
          <use href={`${spriteSvg}#icon_pencil2`}></use>
        </svg>
      )}

      {editModal && <ModalEditTransaction el={props} onClose={onClose} />}
    </>
  );
};

export default EditTransaction;
