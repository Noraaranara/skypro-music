'use client'

import style from './Centerblock.module.css';
import classNames from "classnames";
import Search from "../Search/Search";
import { data } from "@/data";
import Filter from "../Filter/Filter";
import Track from "../Track/Track";

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
                        <Track key={track._id} track={track} playlist={data} />
                    ))}
                </div>
            </div>
        </div>
    )
}