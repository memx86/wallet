import { useDispatch, useSelector } from "react-redux";

import { isTransactionModalSelector, transactionModal } from "redux/session";

import Modal from "components/Modal/Modal";
import s from "./ModalAddTransaction.module.scss";

const ModalAddTransaction = () => {
  const isTransactionModal = useSelector(isTransactionModalSelector);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(transactionModal(false));
  };
  return isTransactionModal ? (
    <Modal modalClassName={s.modal} closeModal={closeModal}></Modal>
  ) : null;
};
export default ModalAddTransaction;
