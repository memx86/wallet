import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { toast } from "react-toastify";

import { isAuthSelector, loggedOff } from "redux/session";
import { useLogoutMutation, useRefreshQuery } from "redux/wallet";

import Loader from "components/Loader";

import s from "./UserName.module.scss";

const UserName = () => {
  const isAuth = useSelector(isAuthSelector);
  const { data, isFetching } = useRefreshQuery(null, { skip: !isAuth });
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const { username } = data;

  const onClick = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged off");
      dispatch(loggedOff());
    } catch (error) {
      toast.error("Can't log out");
    }
  };

  if (isFetching) return <Loader />;
  return (
    <div className={s.wrapper}>
      <span className={s.name}>{username}</span>
      <button type="button" className={s.button} onClick={onClick}>
        <IoLogOutOutline style={{ width: "18px", height: "18px" }} />
      </button>
    </div>
  );
};
export default UserName;
