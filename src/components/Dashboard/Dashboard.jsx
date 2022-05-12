import { useMediaQuery } from "react-responsive";

import Balance from "components/Balance";
import Currency from "components/Currency";
import Navigation from "components/Navigation";
import Table from "components/Table";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import s from "./Dashboard.module.scss";

const Dashboard = () => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <div className={s.wrapper}>
          {!isMobile && <Navigation />}
          <Balance />
        </div>
        {!isMobile && <Currency />}
      </div>
      <Table />
    </div>
  );
};
export default Dashboard;
