import { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

import fetchCurrency from "api/currencyApi";

import s from "./Currency.module.scss";

const Currency = () => {
  const [currencies, setCurrencies] = useState("");
  const [status, setStatus] = useState("idle");

  const setToLocalStorage = (array) => {
    array.map(({ name, value }) =>
      localStorage.setItem(name, JSON.stringify(value))
    );
  };

  useEffect(() => {
    const currentTime = new Date();
    const lastVisitTime = new Date(JSON.parse(localStorage.getItem("time")));
    const currenciesInLocalStorage = JSON.parse(
      localStorage.getItem("currency")
    );

    if (
      currentTime.getTime() - lastVisitTime.getTime() <= 3600000 &&
      currenciesInLocalStorage
    ) {
      setCurrencies(currenciesInLocalStorage);
      setStatus("success");
      return;
    }

    async function getCurrency() {
      setStatus("loading");
      try {
        const data = await fetchCurrency();
        setCurrencies(data);
        setStatus("success");
        setToLocalStorage([
          { name: "currency", value: data },
          { name: "time", value: currentTime },
        ]);
      } catch (error) {
        console.log(error.message);
        setStatus("error");
      }
    }
    getCurrency();
  }, []);

  if (status === "loading") {
    return (
      <>
        <div className={s.wrapper}>
          <TailSpin
            ariaLabel="loading-indicator"
            color="#ffffff"
            height={40}
            width={40}
          />
        </div>
      </>
    );
  }

  if (status === "error") {
    return (
      <>
        <div className={s.wrapper}>
          <p className={s.text}>
            Что-то пошло не так... <br /> Попробуйте позже.
          </p>
        </div>
      </>
    );
  }

  if (status === "success") {
    return (
      <>
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
      </>
    );
  }
};
export default Currency;
