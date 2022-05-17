import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { isButtonShown } from "redux/session";

import { MOBILE_ONLY } from "assets/constants/MEDIA";

import RemoveTransaction from "components/RemoveTransaction";
import EditTransaction from "components/EditTransaction";

import s from "./NewTable.module.scss";

export const TYPE = {
  GENERAL: "general",
  CHART: "chart",
};

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const NewTable = ({
  type = TYPE.GENERAL,
  data,
  categories = false,
  income,
  expense,
}) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isGeneral = type === TYPE.GENERAL;
  const prepareDate = (date) => dayjs(date).format("DD.MM.YY");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isButtonShown(true));
  }, [dispatch]);

  const { t } = useTranslation();
  if (isMobile && isGeneral && data?.length)
    return (
      <ul className={s.list}>
        {data?.map(
          ({
            id,
            transactionDate,
            type,
            categoryId,
            comment,
            amount,
            balanceAfter,
          }) => (
            <li
              key={id}
              className={type === TYPES.INCOME ? s.income : s.expense}
            >
              <ul className={s.listInside}>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.date")}</span>
                  <span>{prepareDate(transactionDate)}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.type")}</span>
                  <span>{type === TYPES.INCOME ? "+" : "-"}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.category")}</span>
                  <span>{categories[categoryId]}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.comment")}</span>
                  <span>{comment}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.amount")}</span>
                  <span
                    style={{
                      color: type === TYPES.INCOME ? "#24cca7" : "#ff6596",
                    }}
                  >
                    {Math.abs(amount)?.toFixed(2)}
                  </span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>{t("newTable.balance")}</span>
                  <span>{balanceAfter?.toFixed(2)}</span>
                  <EditTransaction
                    id={id}
                    transactionDate={transactionDate}
                    type={type}
                    categoryId={categoryId}
                    comment={comment}
                    amount={amount}
                    balanceAfter={balanceAfter}
                  />
                  <RemoveTransaction id={id} />
                </li>
              </ul>
            </li>
          )
        )}
      </ul>
    );

  return (
    <div className={isGeneral ? s.wrapper : s.wrapperChart}>
      {!data.length ? (
        <p> {t("newTable.feelfree")}</p>
      ) : (
        <table className={s.table}>
          <thead>
            <tr className={s.head}>
              {isGeneral && <th className={s.first}>{t("newTable.date")}</th>}
              {isGeneral && <th className={s.center}>{t("newTable.type")}</th>}
              <th className={isGeneral ? s.category : s.chartCategory}>
                {t("newTable.category")}
              </th>
              {isGeneral && (
                <th className={s.comment}>{t("newTable.comment")}</th>
              )}
              <th className={isGeneral ? s.right : s.chartAmount}>
                {t("newTable.amount")}
              </th>
              {isGeneral && (
                <th className={s.balance}>{t("newTable.balance")}</th>
              )}
              {isGeneral && <th className={s.last}>{t("newTable.options")}</th>}
            </tr>
          </thead>
          <tbody className={s.tbody}>
            {data.map(
              ({
                id,
                transactionDate,
                type,
                categoryId,
                comment,
                amount,
                balanceAfter,
                color,
                name,
                total,
              }) => (
                <tr key={id || name} className={s.row}>
                  {isGeneral && (
                    <td className={s.cell}>{prepareDate(transactionDate)}</td>
                  )}
                  {isGeneral && (
                    <td className={s.center}>
                      {type === TYPES.INCOME ? "+" : "-"}
                    </td>
                  )}
                  <td className={isGeneral ? s.category : s.chartCategory}>
                    <div className={s.chartWrapper}>
                      {!isGeneral && (
                        <span
                          className={s.marker}
                          style={{ backgroundColor: color }}
                        ></span>
                      )}
                      {isGeneral ? categories[categoryId] : name}
                    </div>
                  </td>
                  {isGeneral && <td className={s.comment}>{comment}</td>}
                  <td
                    className={`${!isGeneral && s.chartAmount} ${s.right}`}
                    style={
                      isGeneral
                        ? {
                            color:
                              type === TYPES.INCOME ? "#24cca7" : "#ff6596",
                          }
                        : { color: "#000", paddingRight: 20 + "px" }
                    }
                  >
                    {Math.abs(isGeneral ? amount : total)?.toFixed(2)}
                  </td>
                  {isGeneral && (
                    <td className={s.balance}>{balanceAfter?.toFixed(2)}</td>
                  )}
                  {isGeneral && (
                    <td className={s.last}>
                      <div className={s.optionButtons}>
                        <EditTransaction
                          id={id}
                          transactionDate={transactionDate}
                          type={type}
                          categoryId={categoryId}
                          comment={comment}
                          amount={amount}
                          balanceAfter={balanceAfter}
                        />
                        <RemoveTransaction id={id} />
                      </div>
                    </td>
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
      {!isGeneral && (
        <ul className={s.totalAmount}>
          <li className={s.amountItem}>
            <b>{t("newTable.expenses")}</b>
            <b className={s.expenseAmount}>
              {Math.abs(expense)?.toFixed(2) || "--"}
            </b>
          </li>
          <li className={s.amountItem}>
            <b>{t("newTable.incomes")}</b>
            <b className={s.incomeAmount}>{income?.toFixed(2) || "--"}</b>
          </li>
        </ul>
      )}
    </div>
  );
};

NewTable.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      transactionDate: PropTypes.string,
      type: PropTypes.string,
      categoryId: PropTypes.string,
      comment: PropTypes.string,
      amount: PropTypes.number,
      balanceAfter: PropTypes.number,
    })
  ).isRequired,
  categories: PropTypes.objectOf(PropTypes.string),
};

export default NewTable;
