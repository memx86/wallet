// import s from './HomeTab.module.scss'
import { useMediaQuery } from "react-responsive";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Table from "components/Table";
import Balance from "components/Balance";

const HomeTab = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <>
      {isMobile && <Balance />}
      <Table />
    </>
  );
};
export default HomeTab;
