import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { isAuthSelector, logoutModal } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import Loader from "components/Loader";
import { TABLET } from "assets/constants/MEDIA";

import s from "./UserName.module.scss";

const UserName = () => {
  const isAuth = useSelector(isAuthSelector);
  const { data, isFetching } = useRefreshQuery(null, { skip: !isAuth });

  const dispatch = useDispatch();
  const isTablet = useMediaQuery(TABLET);

  const { username } = data;

  const onClick = () => {
    dispatch(logoutModal(true));
  };

  if (isFetching) return <Loader />;
  return (
    <div className={s.wrapper}>
      <span className={s.name}>{username}</span>
      <button type="button" className={s.button} onClick={onClick}>
        <IoLogOutOutline style={{ width: "18px", height: "18px" }} />
        {isTablet && <span>Logout</span>}
      </button>
    </div>
  );
};
export default UserName;
