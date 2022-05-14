import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { transactionModal } from "redux/session";

import IconButton from "components/IconButton";
import s from "./ButtonAddTransactions.module.scss";

const ButtonAddTransactions = () => {
  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(transactionModal(true));
  };
  return (
    <div className={s.container}>
      <IconButton onClick={openModal} label="Add transaction">
        <AiFillPlusCircle className={s.icon} />
      </IconButton>
    </div>
  );
};
export default ButtonAddTransactions;
