import { ROUTER } from "@/app/routes";
import style from './NotFound.module.css'
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={style.NotFound__wrapper}>
      <h1 className={style.NotFound__title}>404</h1>
      <p className={style.NotFound__text}>Страница не найдена</p>
      <span className={style.NotFound__span}>
        Возможно, она была удалена или перенесена на другой адрес
      </span>
      <Link href={ROUTER.main} className={style.NotFound__link}>Вернуться на главную</Link>
    </div>
  );
}