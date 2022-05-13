import { TailSpin } from 'react-loader-spinner';
import s from './Loader.module.scss'

export default function Spinner() {
  return (
    <div className={s.spinner}>
      <TailSpin type="ThreeDots" color="#f3713f" height={100} width={100} />
    </div>
  );
}
