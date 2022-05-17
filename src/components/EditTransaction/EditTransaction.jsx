import spriteSvg from "assets/images/sprite.svg";

import s from "./EditTransaction.module.scss";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useState } from "react";
import ModalAddTransaction from "components/ModalAddTransaction";

const EditTransaction = ({ ...props }) => {
  const [editModal, setEditModal] = useState(false);

  const handleClickEdit = () => {
    setEditModal(!editModal);
  };

  // const onClose = () => {
  //   setEditModal(!editModal);
  // };

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
