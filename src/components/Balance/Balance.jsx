import s from "./Balance.module.scss"

export default function Balance() {
  return (
    <div className={s.balance}>
      <p className={s.balanceTitle}>Ваш баланс</p>
      <p className={s.balanceValue}>
        <span className={s.symbol}>₴</span>
      </p>
    </div>
  );
}

