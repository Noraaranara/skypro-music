'use client';

import Link from 'next/link';
import style from './Track.module.css';
import { formatTime } from '@/utils/helpers';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/uselikeTracks';

type trackTypeProp = {
  track: TrackType;
  playlist: TrackType[];
};

export default function Track({ track, playlist }: trackTypeProp) {
  const dispatch = useAppDispatch();
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const currentPlaying = useAppSelector((state) => state.tracks.isPlay);
  const { toggleLike, isLike } = useLikeTrack(track);

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setCurrentPlaylist(playlist));
  };

  const handleLike = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    toggleLike();
  };

  const isCurrentTrack = currentTrack?._id === track._id;

  return (
    <div className={style.playlist__item} onClick={onClickTrack}>
      <div className={style.playlist__track}>
        <div className={style.track__title}>
          <div className={style.track__titleImage}>
            <svg
              className={classNames(style.track__titleSvg, {
                [style.playing__dot]: isCurrentTrack,
                [style.playing__animation]: isCurrentTrack && currentPlaying,
              })}
            >
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
          <svg className={style.track__timeSvg} onClick={handleLike}>
            <use
              xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
            ></use>
          </svg>
          <span className={style.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
