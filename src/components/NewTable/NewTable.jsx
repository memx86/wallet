import { useMediaQuery } from "react-responsive";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import { MOBILE_ONLY } from "assets/constants/MEDIA";
import s from "./NewTable.module.scss";
import ButtonAddTransactions from "components/ButtonAddTransactions";

export const TYPE = {
  GENERAL: "general",
  CHART: "chart",
};

const TYPES = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

const NewTable = ({ type = TYPE.GENERAL, data, categories }) => {
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const isGeneral = type === TYPE.GENERAL;
  const prepareDate = (date) => dayjs(date).format("DD.MM.YY");
  // console.log("data", data);
  // console.log("prepareDate", prepareDate());
  // console.log("categories", categories);
  if (isMobile && isGeneral)
    return (
      <ul className={s.list}>
        {data.map(
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
              <ul>
                <li className={s.element}>
                  <span className={s.title}>Date</span>
                  <span>{prepareDate(transactionDate)}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>Type</span>
                  <span>{type === TYPES.INCOME ? "+" : "-"}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>Category</span>
                  <span>{categories[categoryId]}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>Comment</span>
                  <span>{comment}</span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>Amount</span>
                  <span
                    style={{
                      color: type === TYPES.INCOME ? "#24cca7" : "#ff6596",
                    }}
                  >
                    {Math.abs(amount)}
                  </span>
                </li>
                <li className={s.element}>
                  <span className={s.title}>Balance</span>
                  <span>{balanceAfter}</span>
                </li>
              </ul>
            </li>
          )
        )}
      </ul>
    );
  return (
    <div className={s.wrapper}>
      <table className={s.table}>
        <thead>
          <tr className={s.head}>
            {isGeneral && <th className={s.first}>Date</th>}
            {isGeneral && <th className={s.center}>Type</th>}
            <th className={isGeneral ? s.category : s.chartCategory}>
              Category
            </th>
            {isGeneral && <th className={s.comment}>Comment</th>}
            <th className={isGeneral ? s.right : s.chartAmount}>Amount</th>
            {isGeneral && <th className={s.last}>Balance</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              id,
              transactionDate,
              type,
              categoryId,
              comment,
              amount,
              balanceAfter,
            }) => (
              <tr key={id} className={s.row}>
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
                        style={{ backgroundColor: "" }}
                      ></span>
                    )}
                    {categories[categoryId]}
                  </div>
                </td>
                {isGeneral && <td className={s.comment}>{comment}</td>}
                <td
                  className={`${!isGeneral && s.chartAmount} ${s.right}`}
                  style={{
                    color: type === TYPES.INCOME ? "#24cca7" : "#ff6596",
                  }}
                >
                  {Math.abs(amount)}
                </td>
                {isGeneral && <td className={s.right}>{balanceAfter}</td>}
              </tr>
            )
          )}
        </tbody>
        {!isGeneral && <tfoot></tfoot>}
      </table>
      {isGeneral && !isMobile && <ButtonAddTransactions />}
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
      categoryId: PropTypes.string.isRequired,
      comment: PropTypes.string,
      amount: PropTypes.number.isRequired,
      balanceAfter: PropTypes.number,
    })
  ).isRequired,
  categories: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NewTable;
