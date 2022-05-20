import { modalTypeSelector } from "redux/session";
import { useSelector } from "react-redux";
import ModalTransaction from "components/ModalTransaction";
import ModalRemoveTransaction from "components/ModalRemoveTransaction";
import ModalLogout from "components/ModalLogout";

export const TYPES = {
  ADD: "add",
  EDIT: "edit",
  REMOVE: "remove",
  LOGOUT: "logout",
};

const GlobalModal = () => {
  const type = useSelector(modalTypeSelector);

  if (type === TYPES.ADD) {
    return <ModalTransaction />;
  }

  if (type === TYPES.EDIT) {
    return <ModalTransaction editModal={true} />;
  }

  if (type === TYPES.REMOVE) {
    return <ModalRemoveTransaction />;
  }

  if (type === TYPES.LOGOUT) {
    return <ModalLogout />;
  }
  return null;
};
export default GlobalModal;
