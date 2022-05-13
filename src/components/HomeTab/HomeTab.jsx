// import s from './HomeTab.module.scss'
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { isAuthSelector } from "redux/session";
import { MOBILE_ONLY } from "assets/constants/MEDIA";
import { useGetTransactionSummaryQuery, useRefreshQuery } from "redux/wallet";
import { useEffect } from "react";

import {
  categoriesIsLoadingSelector,
  categoriesSelector,
  getCategories,
} from "redux/categories";

import Loader from "components/Loader";
import NewTable from "components/NewTable";
import Balance from "components/Balance";

const HomeTab = () => {
  const categories = useSelector(categoriesSelector);
  const isLoadingCategories = useSelector(categoriesIsLoadingSelector);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetTransactionSummaryQuery(null, {
    skip: !isAuth,
  });
  const { data: userData } = useRefreshQuery(null, {
    skip: !isAuth,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading || isLoadingCategories) return <Loader />;
  return (
    <>
      {isMobile && <Balance balance={userData.balance} />}
      {!data?.length ? (
        <p>Feel free to add new transactions</p>
      ) : (
        <NewTable data={data} categories={categories} />
      )}
    </>
  );
};
export default HomeTab;
