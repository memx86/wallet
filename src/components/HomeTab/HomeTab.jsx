import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { useGetTransactionSummaryQuery } from "redux/wallet";
import {
  categoriesIsLoadingSelector,
  categoriesSelector,
  getCategories,
} from "redux/categories";
import { MOBILE_ONLY } from "assets/constants/MEDIA";

import Loader from "components/Loader";
import NewTable from "components/NewTable";
import Balance from "components/Balance";
// import s from './HomeTab.module.scss'

const HomeTab = () => {
  const categories = useSelector(categoriesSelector);
  const isLoadingCategories = useSelector(categoriesIsLoadingSelector);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { data, isLoading } = useGetTransactionSummaryQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading || isLoadingCategories) return <Loader />;
  return (
    <>
      {isMobile && <Balance />}
      <NewTable data={data} categories={categories} />
    </>
  );
};
export default HomeTab;
