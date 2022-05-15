import s from "./Balance.module.scss";

export default function Balance({ balance }) {
  return (
    <div className={s.balance}>
      <p className={s.balanceTitle}>Your balance</p>
      <p className={s.balanceValue}>
        <span className={s.symbol}>₴ {balance?.toFixed(2)}</span>
      </p>
    </div>
  );
}
