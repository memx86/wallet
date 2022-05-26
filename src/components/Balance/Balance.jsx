import s from "./Balance.module.scss";
import useTranslation from "assets/hooks/useTranslation";

export default function Balance({ balance }) {
  const { t } = useTranslation("balance");
  return (
    <div className={s.balance}>
      <p className={s.balanceTitle}>{t.balance}</p>
      <p className={s.balanceValue}>
        <span className={s.symbol}>₴ {balance?.toFixed(2)}</span>
      </p>
    </div>
  );
}
