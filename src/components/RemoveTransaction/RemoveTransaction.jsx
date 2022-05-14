import s from "./RemoveTransaction.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteTransactionMutation } from "redux/wallet/wallet-api";
import { isRemovalSelector } from "redux/session/session-selectors";
import { removalModal } from "redux/session";
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { toast } from "react-toastify";
import spriteSvg from "assets/images/sprite.svg";

let elementId = null;

const RemoveTransaction = ({ id }) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const dispatch = useDispatch();
  const isRemoval = useSelector((state) => isRemovalSelector(state));
  const [removal] = useDeleteTransactionMutation();

  const openModal = () => {
    elementId = id;
    dispatch(removalModal(true));
  };

  const removeItem = async () => {
    try {
      await removal(elementId);
      toast.success("Transaction successfully removed");
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(removalModal(false));
    }
  };

  const cancel = () => {
    dispatch(removalModal(false));
  };

  return (
    <>
      {isMobile ? (
        <svg
          width="30px"
          height="30px"
          className={s.removeIcon}
          onClick={openModal}
        >
          <use href={`${spriteSvg}#remove`}></use>
        </svg>
      ) : (
        <svg
          width="20px"
          height="20px"
          className={s.removeIcon}
          onClick={openModal}
        >
          <use href={`${spriteSvg}#bin`}></use>
        </svg>
      )}

      {isRemoval && (
        <div className={s.backdrop}>
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
        </div>
      )}
    </>
  );
};

export default RemoveTransaction;
