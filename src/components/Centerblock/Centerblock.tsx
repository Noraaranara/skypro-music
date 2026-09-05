'use client';

import style from './Centerblock.module.css';
import classNames from 'classnames';
import Search from '../Search/Search';
import Filter from '../Filter/Filter';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import SkeletonTrack from '../Loading/Loading';

export type Props = {
  tracks: TrackType[];
  selectionName?: string;
  loading?: boolean;
  error?: string;
};

export default function Centerblock({ tracks, selectionName, loading, error }: Props) {
  return (
    <div className={style.centerblock}>
      <Search />
      <h2 className={style.centerblock__h2}>{selectionName ?? 'Треки'}</h2>
      <Filter tracks={tracks} />
      <div className={style.centerblock__content}>
        <div className={style.content__title}>
          <div className={classNames(style.playlistTitle__col, style.col01)}>
            Трек
          </div>
          <div className={classNames(style.playlistTitle__col, style.col02)}>
            Исполнитель
          </div>
          <div className={classNames(style.playlistTitle__col, style.col03)}>
            Альбом
          </div>
          <div className={classNames(style.playlistTitle__col, style.col04)}>
            <svg className={style.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={style.content__playlist}>
          {loading ? (
            <>
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
              <SkeletonTrack />
            </>
          ) : error ? (
            <div className={style.error}>{error}</div>
          ) : (
            tracks.map((track) => (
              <Track key={track._id} track={track} playlist={tracks} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
