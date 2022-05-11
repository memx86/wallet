import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import fetchCurrency from "api/currencyApi";

import s from "./Currency.module.scss";

const Currency = () => {
  const KEYS = {
    TIME: "wallet/time",
    CURRENCY: "wallet/currency",
  };

  const STATUS = {
    IDLE: "idle",
    LOADING: "loading",
    SUCCESS: "success",
    ERROR: "error",
  };

  const [currencies, setCurrencies] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);

  const setToLocalStorage = (array) => {
    array.map(({ name, value }) =>
      localStorage.setItem(name, JSON.stringify(value))
    );
  };

  useEffect(() => {
    const currentTime = new Date();
    const lastVisitTime = new Date(JSON.parse(localStorage.getItem(KEYS.TIME)));
    const currenciesInLocalStorage = JSON.parse(
      localStorage.getItem(KEYS.CURRENCY)
    );

    if (
      currentTime.getTime() - lastVisitTime.getTime() <= 3600000 &&
      currenciesInLocalStorage
    ) {
      setCurrencies(currenciesInLocalStorage);
      setStatus(STATUS.SUCCESS);
      return;
    }

    async function getCurrency() {
      setStatus(STATUS.LOADING);
      try {
        const data = await fetchCurrency();
        setCurrencies(data);
        setStatus("success");
        setToLocalStorage([
          { name: KEYS.CURRENCY, value: data },
          { name: KEYS.TIME, value: currentTime },
        ]);
      } catch (error) {
        setStatus(STATUS.ERROR);
      }
    }
    getCurrency();
  }, [KEYS.CURRENCY, KEYS.TIME, STATUS.ERROR, STATUS.LOADING, STATUS.SUCCESS]);

  if (status === STATUS.LOADING) {
    return (
      <div className={s.wrapper}>
        <TailSpin
          ariaLabel="loading-indicator"
          color="#ffffff"
          height={40}
          width={40}
        />
      </div>
    );
  }

  if (status === STATUS.ERROR) {
    return (
      <div className={s.wrapper}>
        <p className={s.text}>
          Что-то пошло не так... <br /> Попробуйте позже.
        </p>
      </div>
    );
  }

  if (status === STATUS.SUCCESS) {
    return (
      <table className={s.table}>
        <thead className={s.thead}>
          <tr>
            <th className={s.thLeft}>Валюта</th>
            <th className={s.thCenter}>Покупка</th>
            <th className={s.thRight}>Продажа</th>
          </tr>
        </thead>
        <tbody className={s.tbody}>
          {currencies.map(({ ccy, buy, sale }) => {
            return (
              <tr className={s.trBody} key={ccy}>
                <td className={s.tdLeft}>{ccy}</td>
                <td className={s.tdCenter}>{Number(buy).toFixed(2)}</td>
                <td className={s.tdRight}>{Number(sale).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
export default Currency;
