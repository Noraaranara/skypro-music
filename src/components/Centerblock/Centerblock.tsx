import Link from "next/link";
import style from './Centerblock.module.css';
import classNames from "classnames";

export default function Centerblock() {
    return (
        <div className={style.centerblock}>
            <div className={style.centerblock__search}>
                <svg className={style.search__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
                </svg>
                <input
                    className={style.search__text}
                    type="search"
                    placeholder="Поиск"
                    name="search"
                />
            </div>
            <h2 className={style.centerblock__h2}>Треки</h2>
            <div className={style.centerblock__filter}>
                <div className={style.filter__title}>Искать по:</div>
                <div className={style.filter__button}>исполнителю</div>
                <div className={style.filter__button}>году выпуска</div>
                <div className={style.filter__button}>жанру</div>
            </div>
            <div className={style.centerblock__content}>
                <div className={style.content__title}>
                    <div className={classNames(style.playlistTitle__col, style.col01)}>Трек</div>
                    <div className={classNames(style.playlistTitle__col, style.col02)}>Исполнитель</div>
                    <div className={classNames(style.playlistTitle__col, style.col03)}>Альбом</div>
                    <div className={classNames(style.playlistTitle__col, style.col04)}>
                    <svg className={style.playlistTitle__svg}>
                        <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
                    </svg>
                    </div>
                </div>
                <div className={style.content__playlist}>
                    <div className={style.playlist__item}>
                        <div className={style.playlist__track}>
                            <div className={style.track__title}>
                                <div className={style.track__titleImage}>
                                    <svg className={style.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className="track__title-text">
                                    <Link className={style.track__titleLink} href="">
                                    Guilt <span className={style.track__titleSpan}></span>
                                    </Link>
                                </div>
                            </div>
                            <div className={style.track__author}>
                                <Link className={style.track__authorLink} href="">
                                    Nero
                                </Link>
                            </div>
                            <div className={style.track__album}>
                                <Link className={style.track__albumLink} href="">
                                    Welcome Reality
                                </Link>
                            </div>
                            <div className="track__time">
                                <svg className={style.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={style.track__timeText}>4:44</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.playlist__item}>
                        <div className={style.playlist__track}>
                            <div className={style.track__title}>
                                <div className={style.track__titleImage}>
                                    <svg className={style.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className="track__title-text">
                                    <Link className={style.track__titleLink} href="">
                                    Elektro <span className={style.track__titleSpan}></span>
                                    </Link>
                                </div>
                            </div>
                            <div className={style.track__author}>
                                <Link className={style.track__authorLink} href="">
                                    Dynoro, Outwork, Mr. Gee
                                </Link>
                            </div>
                            <div className={style.track__album}>
                                <Link className={style.track__albumLink} href="">
                                    Elektro
                                </Link>
                            </div>
                            <div className="track__time">
                                <svg className={style.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={style.track__timeText}>2:22</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.playlist__item}>
                        <div className={style.playlist__track}>
                            <div className={style.track__title}>
                                <div className={style.track__titleImage}>
                                    <svg className={style.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className="track__title-text">
                                    <Link className={style.track__titleLink} href="">
                                    I’m Fire <span className={style.track__titleSpan}></span>
                                    </Link>
                                </div>
                            </div>
                            <div className={style.track__author}>
                                <Link className={style.track__authorLink} href="">
                                    Ali Bakgor
                                </Link>
                            </div>
                            <div className={style.track__album}>
                                <Link className={style.track__albumLink} href="">
                                    I’m Fire
                                </Link>
                            </div>
                            <div className="track__time">
                                <svg className={style.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={style.track__timeText}>2:22</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.playlist__item}>
                        <div className={style.playlist__track}>
                            <div className={style.track__title}>
                                <div className={style.track__titleImage}>
                                    <svg className={style.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div className="track__title-text">
                                    <Link className={style.track__titleLink} href="">
                                    Non Stop
                                    <span className={style.track__titleSpan}>(Remix)</span>
                                    </Link>
                                </div>
                            </div>
                            <div className={style.track__author}>
                                <Link className={style.track__authorLink} href="">
                                    Стоункат, Psychopath
                                </Link>
                            </div>
                            <div className={style.track__album}>
                                <Link className={style.track__albumLink} href="">
                                    Non Stop
                                </Link>
                            </div>
                            <div className="track__time">
                                <svg className={style.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={style.track__timeText}>4:12</span>
                            </div>
                        </div>
                    </div>

                    <div className={style.playlist__item}>
                        <div className={style.playlist__track}>
                            <div className={style.track__title}>
                                <div className={style.track__titleImage}>
                                    <svg className={style.track__titleSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                    </svg>
                                </div>
                                <div>
                                    <Link className={style.track__titleLink} href="">
                                    Run Run
                                        <span className={style.track__titleSpan}>
                                            (feat. AR/CO)
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className={style.track__author}>
                                <Link className={style.track__authorLink} href="">
                                    Jaded, Will Clarke, AR/CO
                                </Link>
                            </div>
                            <div className={style.track__album}>
                                <Link className={style.track__albumLink} href="">
                                    Run Run
                                </Link>
                            </div>
                            <div className="track__time">
                                <svg className={style.track__timeSvg}>
                                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                </svg>
                                <span className={style.track__timeText}>2:54</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}