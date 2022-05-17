import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { isAuthSelector } from "redux/session";
import { useGetTransactionsQuery, useRefreshQuery } from "redux/wallet";
import {
  categoriesIsLoadingSelector,
  categoriesSelector,
  getCategories,
} from "redux/categories";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Loader from "components/Loader";
import NewTable from "components/NewTable";
import Balance from "components/Balance";
import ButtonAddTransactions from "components/ButtonAddTransactions";
// import s from './HomeTab.module.scss'

const HomeTab = () => {
  const categories = useSelector(categoriesSelector);
  const isLoadingCategories = useSelector(categoriesIsLoadingSelector);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetTransactionsQuery(null, {
    skip: !isAuth,
  });
  const { data: userData } = useRefreshQuery(null, {
    skip: !isAuth,
  });

  const filteredData = (data) => {
    return [...data].sort(
      (a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)
    );
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isFetching || isLoadingCategories) return <Loader />;
  return (
    <Fragment>
      {isMobile && <Balance balance={userData.balance} />}
      <NewTable data={filteredData(data)} categories={categories} />
      {isMobile && <ButtonAddTransactions />}
    </Fragment>
  );
};
export default HomeTab;
