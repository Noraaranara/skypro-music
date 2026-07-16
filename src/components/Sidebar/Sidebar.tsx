import Image from "next/image";
import Link from "next/link";
import style from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={style.main__sidebar}>
            <div className={style.sidebar__personal}>
                <p className={style.sidebar__personalName}>Sergey.Ivanov</p>
                <div className={style.sidebar__icon}>
                    <svg>
                    <use xlinkHref="/img/icon/sprite.svg#logout"></use>
                    </svg>
                </div>
            </div>
            <div className={style.sidebar__block}>
                <div className={style.sidebar__list}>
                    <div className={style.sidebar__item}>
                        <Link className={style.sidebar__link} href="#">
                            <Image
                            className={style.sidebar__img}
                            src="/img/playlist01.png"
                            alt="day's playlist"
                            width={250}
                            height={170}
                            />
                        </Link>
                    </div>
                    <div className={style.sidebar__item}>
                        <Link className={style.sidebar__link} href="#">
                            <Image
                            className={style.sidebar__img}
                            src="/img/playlist02.png"
                            alt="day's playlist"
                            width={250}
                            height={170}
                            />
                        </Link>
                    </div>
                    <div className={style.sidebar__item}>
                        <Link className={style.sidebar__link} href="#">
                            <Image
                            className={style.sidebar__img}
                            src="/img/playlist03.png"
                            alt="day's playlist"
                            width={250}
                            height={170}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}