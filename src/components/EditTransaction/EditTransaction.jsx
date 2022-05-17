import spriteSvg from "assets/images/sprite.svg";

import s from "./EditTransaction.module.scss";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useState } from "react";
import ModalAddTransaction from "components/ModalAddTransaction";
import IconButton from "components/IconButton/IconButton";

const EditTransaction = ({ ...props }) => {
  const [editModal, setEditModal] = useState(false);

  const handleClickEdit = () => {
    setEditModal(!editModal);
  };

  const isMobile = useMediaQuery(MOBILE_ONLY);
  // const isMobile = false;

  return (
    <>
      {isMobile ? (
        <div className={s.edit}>
          <IconButton onClick={handleClickEdit} label="Edit transaction">
            <svg className={s.iconMobile}>
              <use href={`${spriteSvg}#icon_pencil2`}></use>
            </svg>
          </IconButton>
        </div>
      ) : (
        <IconButton onClick={handleClickEdit} label="Edit transaction">
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
