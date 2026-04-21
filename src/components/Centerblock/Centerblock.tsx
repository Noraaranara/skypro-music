import Link from "next/link";
import style from './Centerblock.module.css';
import classNames from "classnames";
import Search from "../Search/Search";
import { data } from "@/data";
import { formatTime } from "@/utils/helpers";
import Filter from "../Filter/Filter";

export default function Centerblock() {
    return (
        <div className={style.centerblock}>
            <Search />
            <h2 className={style.centerblock__h2}>Треки</h2>
            <Filter />
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
                    {data.map((track) => (
                        <div key={track._id} className={style.playlist__item}>
                            <div className={style.playlist__track}>
                                <div className={style.track__title}>
                                    <div className={style.track__titleImage}>
                                        <svg className={style.track__titleSvg}>
                                            <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                                        </svg>
                                    </div>
                                    <div className="track__title-text">
                                        <Link className={style.track__titleLink} href="">
                                        {track.name} <span className={style.track__titleSpan}></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className={style.track__author}>
                                    <Link className={style.track__authorLink} href="">
                                        {track.author}
                                    </Link>
                                </div>
                                <div className={style.track__album}>
                                    <Link className={style.track__albumLink} href="">
                                        {track.album}
                                    </Link>
                                </div>
                                <div className="track__time">
                                    <svg className={style.track__timeSvg}>
                                        <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                                    </svg>
                                    <span className={style.track__timeText}>{formatTime(track.duration_in_seconds)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}